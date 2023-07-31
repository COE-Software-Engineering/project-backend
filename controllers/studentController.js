import {
  FORM_CONSTANTS,
  ERROR_CODES,
  CONFIG_CONSTANTS,
} from "../config/constants.js";
import {
  getStudentWithIndex,
  activateAccount,
  getStudentWithEmail,
  changeAccountPassword,
} from "../models/studentModel.js";
import {
  generateRandomString,
  hashText,
  compareHash,
} from "../utilities/utility_functions.js";
import { sendPasswordOnSignup } from "../utilities/mail.js";

// sign up handler
export const signup = async (req, res) => {
  try {
    // check for csrf_token
    let errorCodes = [];
    if (!FORM_CONSTANTS.INDEXNUM_REGEX.test(req.body.index_number))
      errorCodes.push(ERROR_CODES.INVALID_INDEXNUM);
    if (!FORM_CONSTANTS.EMAIL_REGEX.test(req.body.email))
      errorCodes.push(ERROR_CODES.INVALID_EMAIL);

    if (errorCodes.length == 0) {
      let query_res = await getStudentWithIndex(req.body.index_number);
      if (query_res.rows.length) {
        if (query_res.rows[0].active === "0") {
          let tempPass = generateRandomString(
            CONFIG_CONSTANTS.TEMP_PASSWORD_LENGTH
          );
          // sending the password to the user
          let passSendRes = await sendPasswordOnSignup(
            req.body.email,
            tempPass
          );
          if (passSendRes.accepted.length) {
            let hashedPassword = await hashText(
              tempPass,
              CONFIG_CONSTANTS.HASH_SALTROUNDS
            );
            let activateRes = await activateAccount(
              req.body.index_number,
              req.body.email,
              hashedPassword
            );
            if (activateRes !== 1)
              errorCodes.push(ERROR_CODES.UNKNOWN_SIGNUP_ERROR);
          } else {
            errorCodes.push(ERROR_CODES.UNKNOWN_SIGNUP_ERROR);
          }
        } else {
          errorCodes.push(ERROR_CODES.ACCOUNT_ALREADY_ACTIVE);
        }
      } else {
        errorCodes.push(ERROR_CODES.INDEXNUM_NOT_FOUND);
      }
    }

    res.json(errorCodes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// sign in handler
export const signin = async (req, res) => {
  let errorCodes = [];
  let userInfo = {};
  try {
    let queryRes = await getStudentWithEmail(req.body.email);
    if (queryRes.rows.length && queryRes.rows[0].active === "1") {
      if (
        (await compareHash(req.body.password, queryRes.rows[0].password))
      ) {
        userInfo = queryRes.rows[0];
        delete userInfo.password;
      } else {
        errorCodes.push(ERROR_CODES.INVALID_SIGNIN_CREDENTIALS);
      }
    }
    else{
      errorCodes.push(ERROR_CODES.ACCOUNT_NOT_ACTIVE);
    }
    res.json({ errorCodes, userInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// change password handler
export const changePassword = async (req, res) => {
  let errorCodes = [];
  try {
    let queryRes = await getStudentWithIndex(req.body.index_number);
    if (
      queryRes.rows.length &&
      (await compareHash(req.body.current_password, queryRes.rows[0].password))
    ) {
      if (!FORM_CONSTANTS.PASSWORD_REGEX.test(req.body.new_password))
        errorCodes.push(ERROR_CODES.INVALID_PASSWORD);
      if (req.body.new_password !== req.body.new_password_confirm)
        errorCodes.push(ERROR_CODES.PASSWORD_MISMATCH);

      if (errorCodes.length === 0) {
        let newHashedPassword = await hashText(
          req.body.new_password,
          CONFIG_CONSTANTS.HASH_SALTROUNDS
        );

        if (
          !(await changeAccountPassword(
            req.body.index_number,
            newHashedPassword
          ))
        ) {
          errorCodes.push(ERROR_CODES.ERROR_CHANGING_PASS_IN_DB);
        }
      }
    } else {
      errorCodes.push(ERROR_CODES.WRONG_PASSWORD);
    }
    res.json(errorCodes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
