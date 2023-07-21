export const FORM_CONSTANTS = {
  NAME_REGEX: /^[A-Za-z]{1,50}/,
  EMAIL_REGEX: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/,
  PASSWORD_REGEX:
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[/*.~!@#$%^&*()_+?|\\]).{8,50}$/,
  INDEXNUM_REGEX: /^[0-9]{7}/,
  STAFFID_REGEX: /^[0-9]{8}/
};

export const ERROR_CODES = {
  INVALID_FIRSTNAME: [0, "Invalid First name"],
  INVALID_LASTNAME: [1, "Invalid Last ame"],
  INVALID_FULLNAME: [2, "Invalid full name"],
  INVALID_EMAIL: [3, "Invalid email address"],
  INVALID_PASSWORD: [4, "Invalid password"],
  PASSWORD_MISMATCH: [5, "Password mismatch"],
  INVALID_INDEXNUM: [6, "Invalid index number"],
  INDEXNUM_NOT_FOUND: [7, "Index number not found"],
  ACCOUNT_ALREADY_ACTIVE: [8, "Account already active"],
  UNKNOWN_SIGNUP_ERROR: [9, "Uknown sign up error"],
  INVALID_SIGNIN_CREDENTIALS: [10, "Invalid sign in credentials"],
  INVALID_STAFFID: [11, "Invalid staff id"],
  STAFFID_NOT_FOUND: [12, "Staff id not found"],
  ERROR_ADDING_ANNOUNCEMENT: [13, "Error adding announcement"],
  

  ERROR_CHANGING_PASS_IN_DB: [14, "Error changing password in database"]
};

export const CONFIG_CONSTANTS = {
  TEMP_PASSWORD_LENGTH: 10,
  HASH_SALTROUNDS : 10
}
