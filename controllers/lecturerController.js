import {
  FORM_CONSTANTS,
  ERROR_CODES,
  CONFIG_CONSTANTS,
} from "../config/constants.js";
import {
  getLecturerWithStaffId,
  activateAccount,
  getLecturerWithEmail,
  addAnnouncement,
  changeAccountPassword,
} from "../models/lecturerModel.js";
import {
  generateRandomString,
  hashText,
  compareHash,
  removeHTMLSpecialchars,
} from "../utilities/utility_functions.js";
import { sendPasswordOnSignup } from "../utilities/mail.js";

// sign up handler
export const signup = async (req, res) => {
  let errorCodes = [];
  try {
    // check for csrf_token
    if (!FORM_CONSTANTS.STAFFID_REGEX.test(req.body.staff_id))
      errorCodes.push(ERROR_CODES.INVALID_STAFFID);
    if (!FORM_CONSTANTS.EMAIL_REGEX.test(req.body.email))
      errorCodes.push(ERROR_CODES.INVALID_EMAIL);

    if (errorCodes.length == 0) {
      let query_res = await getLecturerWithStaffId(req.body.staff_id);
      if (query_res.rows.length) {
        if (query_res.rows[0].active === "0") {
          let tempPass = generateRandomString(
            CONFIG_CONSTANTS.TEMP_PASSWORD_LENGTH
          );
          console.log(tempPass);
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
              req.body.staff_id,
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
        errorCodes.push(ERROR_CODES.STAFFID_NOT_FOUND);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }

  res.json(errorCodes);
};

export const signin = async (req, res) => {
  let errorCodes = [];
  let userInfo = {};
  try {
    let queryRes = await getLecturerWithEmail(req.body.email);
    if (
      queryRes.rows.length &&
      (await compareHash(req.body.password, queryRes.rows[0].password))
    ) {
      userInfo = queryRes.rows[0];
    } else {
      errorCodes.push(ERROR_CODES.INVALID_SIGNIN_CREDENTIALS);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }

  res.json({ errorCodes, userInfo });
};

/**
 * end point for changing password
 */
export const changePassword = async (req, res) => {
  let errorCodes = [];
  try {
    let queryRes = await getLecturerWithStaffId(req.body.staff_id);
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

        // change password
        if (
          !(await changeAccountPassword(req.body.staff_id, newHashedPassword))
        ) {
          errorCodes.push(ERROR_CODES.ERROR_CHANGING_PASS_IN_DB);
        }
      }
    } else {
      errorCodes.push(ERROR_CODES.WRONG_PASSWORD);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }

  res.json(errorCodes);
};

/**
 * end point for adding announcment to database
 */
export const makeAnnouncement = async (req, res) => {
  let errorCodes = [];
  try {
    let title = removeHTMLSpecialchars(req.body.title);
    let content = removeHTMLSpecialchars(req.body.content);
    let queryRes = await addAnnouncement(req.body.staff_id, title, content);
    console.log(title, content);
    console.log(queryRes);
    if (!queryRes.rowCount) {
      errorCodes.push(ERROR_CODES.ERROR_ADDING_ANNOUNCEMENT);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }

  res.json(errorCodes);
};
