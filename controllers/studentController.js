import {
  FORM_CONSTANTS,
  ERROR_CODES,
  CONFIG_CONSTANTS,
} from "../config/constants.js";
import { getStudent, activateAccount } from "../models/studentModel.js";
import {
  generateRandomString,
  hashText,
  compareHash,
} from "../utilities/utility_functions.js";

// sign up handler
export const signup = async (req, res) => {
  try {
    // check for csrf_token
    let errorCodes = [];
    // if (!FORM_CONSTANTS.NAME_REGEX.test(req.body.full_name))
    //   errorCodes.push(ERROR_CODES.INVALID_FULLNAME);
    // if (!FORM_CONSTANTS.PASSWORD_REGEX.test(req.body.password))
    //   errorCodes.push(ERROR_CODES.INVALID_PASSWORD);
    // if (req.body.password !== req.body.confirm_password)
    //   errorCodes.push(ERROR_CODES.PASSWORD_MISMATCH);
    if (!FORM_CONSTANTS.INDEXNUM_REGEX.test(req.body.index_num))
      errorCodes.push(ERROR_CODES.INVALID_INDEXNUM);
    if (!FORM_CONSTANTS.EMAIL_REGEX.test(req.body.email))
      errorCodes.push(ERROR_CODES.INVALID_EMAIL);

    if (errorCodes.length == 0) {
      // let res = await doesIndexExist(req.body.index_num);
      let query_res = await getStudent(req.body.index_num);
      if (query_res.rows.length) {
        if (query_res.rows[0].active === "0") {
          let tempPass = generateRandomString(
            CONFIG_CONSTANTS.TEMP_PASSWORD_LENGTH
          );
          console.log(tempPass);
          let hashedPassword = await hashText(
            tempPass,
            CONFIG_CONSTANTS.HASH_SALTROUNDS
          );
          let activateRes = await activateAccount(
            req.body.index_num,
            req.body.email,
            hashedPassword
          );
          if (activateRes !== 1)
            errorCodes.push(ERROR_CODES.UNKNOWN_SIGNUP_ERROR);
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
  try {
    let queryRes = await getStudent(req.body.index_num);
    if (!(queryRes.rows.length && (await compareHash(req.body.password, queryRes.rows[0].password))))
      errorCodes.push(ERROR_CODES.INVALID_SIGNIN_CREDENTIALS);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }

  res.send(errorCodes);
};
