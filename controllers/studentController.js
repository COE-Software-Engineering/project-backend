import { FORM_CONSTANTS } from "../config/constants.js";
import { ERROR_CODES } from "../config/constants.js";

// sign up handler
export const signup = async (req, res) => {
  try {
    // check for csrf_token
    let error_codes = [];
    if (!FORM_CONSTANTS.NAME_REGEX.test(req.body.full_name))
      error_codes.push(ERROR_CODES.INVALID_FULLNAME);
    if (!FORM_CONSTANTS.INDEXNUM_REGEX.test(req.body.index_num))
      error_codes.push(ERROR_CODES.INVALID_INDEXNUM);
    if (!FORM_CONSTANTS.EMAIL_REGEX.test(req.body.email))
      error_codes.push(ERROR_CODES.INVALID_EMAIL);
    if (!FORM_CONSTANTS.PASSWORD_REGEX.test(req.body.password))
      error_codes.push(ERROR_CODES.INVALID_PASSWORD);
    if (req.body.password !== req.body.confirm_password)
      error_codes.push(ERROR_CODES.PASSWORD_MISMATCH);

    if(error_codes.length == 0){
      // check if index number exists
      //if index_number exists generate random password and send as mail to email
      // else inform user that INDEX NUMBER NOT FOUND!
      

      // if alls well send success signal to user
    }
    else{
      res.json(error_codes);
    }
    
  } catch (error) {
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
