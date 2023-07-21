// importing database stuff
import * as db from "./postgresql.js";

/**
 * Function to check if index number in student database
 * @param {index_number} index_num
 */
export async function doesIndexExist(index_num) {
  let query = "SELECT * FROM Student WHERE index_number = $1";
  let params = [index_num];
  let res = await db.query(query, params);
  if (res.rows.length) return true;
  else return false;
}

export async function activateAccount(index_num, email, password) {
  let query =
    "UPDATE Student SET email = $1, active = '1', password=$2 WHERE index_number = $3";
  let params = [email, password, index_num];
  let res = await db.query(query, params);
  return res.rowCount;
}

export async function getStudentWithIndex(index_num) {
  let query = "SELECT * FROM Student WHERE index_number = $1";
  let params = [index_num];
  return await db.query(query, params);
}

export async function getStudentWithEmail(email) {
  let query = "SELECT * FROM Student WHERE email = $1";
  let params = [email];
  return await db.query(query, params);
}

/**
 * change password in database
 * @param {int} id the id of the user
 * @param {string} new_password the new password to use
 * @return {boolean} true when password change was successful else false
 */
export async function changeAccountPassword(id, new_password) {
  let query = "UPDATE Student SET password = $2 WHERE index_number = $1";
  let res = await db.query(query, [id, new_password]);
  return !!res.rowCount;
}
