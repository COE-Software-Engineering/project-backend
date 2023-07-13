export const FORM_CONSTANTS = {
  NAME_REGEX: /^[A-Za-z]{1,50}/,
  EMAIL_REGEX: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/,
  PASSWORD_REGEX:
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[/*.~!@#$%^&*()_+?|\\]).{8,50}$/,
  INDEXNUM_REGEX: /^[0-9]{7}/
};

export const ERROR_CODES = {
  INVALID_FIRSTNAME: 0,
  INVALID_LASTNAME: 1,
  INVALID_FULLNAME: 2,
  INVALID_EMAIL: 3,
  INVALID_PASSWORD: 4,
  PASSWORD_MISMATCH: 5,
  INVALID_INDEXNUM: 6
};
