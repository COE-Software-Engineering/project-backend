// importing database stuff
import * as db from "./postgresql.js";

/**
 * Function to check if staff_id in database
 * @param {index_number} index_num
 */
export async function doesStaffIdExist(staff_id) {
  let query = "SELECT * FROM Lecturer WHERE staff_id = $1";
  let params = [staff_id];
  let res = await db.query(query, params);
  if (res.rows.length) return true;
  else return false;
}

export async function activateAccount(staff_id, email, password ) {
  let query = "UPDATE Lecturer SET email = $1, active = '1', password=$2 WHERE staff_id = $3";
  let params = [email, password, staff_id];
  let res = await db.query(query, params);
  return res.rowCount;
}

export async function getLecturerWithStaffId(staff_id) {
  let query = "SELECT * FROM Lecturer WHERE staff_id = $1";
  let params = [staff_id];
  return await db.query(query, params);
}

export async function getLecturerWithEmail(email){
  let query = "SELECT * FROM Lecturer WHERE email = $1";
  let params = [email];
  return await db.query(query, params);
}

/**
 * add annoucement made to database
 * @param {string} title title of announcement
 * @param {string} content content of announcement
 * @returns {int} 1 on success
 */
export async function addAnnouncement(id, title, content){
  let query = "INSERT INTO Announcement (poster_id, title, content) VALUES ($1, $2, $3)";
  return await db.query(query, [id, title, content]);
}

/**
 * change password in database
 * @param {int} id the id of the user
 * @param {string} new_password the new password to use
 * @return {boolean} true when password change was successful else false 
 */
export async function changeAccountPassword(staff_id, new_password){
  let query = "UPDATE Lecturer SET password = $2 WHERE staff_id = $1";
  let res = await db.query(query, [staff_id, new_password]);
  return !!res.rowCount;
}
