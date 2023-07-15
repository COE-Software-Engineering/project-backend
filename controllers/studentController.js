import {
  FORM_CONSTANTS,
  ERROR_CODES,
  CONFIG_CONSTANTS,
} from "../config/constants.js";
import { getStudent, activateAccount } from "../models/studentModel.js";
import {
  generateRandomString,
  hashText,
} from "../utilities/utility_functions.js";

// sign up handler
export const signup = async (req, res) => {
  try {
    // check for csrf_token
    let error_codes = [];
    // if (!FORM_CONSTANTS.NAME_REGEX.test(req.body.full_name))
    //   error_codes.push(ERROR_CODES.INVALID_FULLNAME);
    // if (!FORM_CONSTANTS.PASSWORD_REGEX.test(req.body.password))
    //   error_codes.push(ERROR_CODES.INVALID_PASSWORD);
    // if (req.body.password !== req.body.confirm_password)
    //   error_codes.push(ERROR_CODES.PASSWORD_MISMATCH);
    if (!FORM_CONSTANTS.INDEXNUM_REGEX.test(req.body.index_num))
      error_codes.push(ERROR_CODES.INVALID_INDEXNUM);
    if (!FORM_CONSTANTS.EMAIL_REGEX.test(req.body.email))
      error_codes.push(ERROR_CODES.INVALID_EMAIL);

    if (error_codes.length == 0) {
      // let res = await doesIndexExist(req.body.index_num);
      let res = await getStudent(req.body.index_num);
      if (res.rows.length) {
        if (res.rows[0].active === "0") {
          let tempPass = generateRandomString(
            CONFIG_CONSTANTS.TEMP_PASSWORD_LENGTH
          );
          let hashedPassword = await hashText(
            tempPass,
            CONFIG_CONSTANTS.HASH_SALTROUNDS
          );
          let activate_res = await activateAccount(
            req.body.index_num,
            req.body.email,
            hashedPassword
          );
          if (activate_res == 1)
            error_codes.push(ERROR_CODES.UNKNOWN_SIGNUP_ERROR);
        } else {
          error_codes.push(ERROR_CODES.ACCOUNT_ALREADY_ACTIVE);
        }
      } else {
        error_codes.push(ERROR_CODES.INDEXNUM_NOT_FOUND);
      }
    }

    res.json(error_codes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// sign in handler
export const signin = async (req, res) => {
  try {
    //this is where the logic code will go
    console.log("request has been received"); // for debugging
    res.send("Student sign IN endpoint reached");
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
