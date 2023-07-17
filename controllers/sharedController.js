import { query } from "express";
import {
  FORM_CONSTANTS,
  ERROR_CODES,
  CONFIG_CONSTANTS,
} from "../config/constants.js";
import {
  getStudentWithIndex,
  activateAccount,
  getStudentWithEmail,
} from "../models/studentModel.js";
import {
  generateRandomString,
  hashText,
  compareHash,
} from "../utilities/utility_functions.js";
import { sendPasswordOnSignup } from "../utilities/mail.js";

async function signup(id, email) {
  // check for csrf_token
  let errorCodes = [];
  if (!FORM_CONSTANTS.INDEXNUM_REGEX.test(id))
    errorCodes.push(ERROR_CODES.INVALID_INDEXNUM);
  if (!FORM_CONSTANTS.EMAIL_REGEX.test(email))
    errorCodes.push(ERROR_CODES.INVALID_EMAIL);

  if (errorCodes.length == 0) {
    let query_res = await getStudentWithIndex(id);
    if (query_res.rows.length) {
      if (query_res.rows[0].active === "0") {
        let tempPass = generateRandomString(
          CONFIG_CONSTANTS.TEMP_PASSWORD_LENGTH
        );
        console.log(tempPass);
        // sending the password to the user
        let passSendRes = await sendPasswordOnSignup(email, tempPass);
        if (passSendRes.accepted.length) {
          let hashedPassword = await hashText(
            tempPass,
            CONFIG_CONSTANTS.HASH_SALTROUNDS
          );
          let activateRes = await activateAccount(
            id,
            email,
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

  return errorCodes;
}
