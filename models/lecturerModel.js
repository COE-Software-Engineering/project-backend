// importing database stuff
import * as db from "./postgresql.js";

/**
 * Function to check if staff_id in database
 * @param {index_number} index_num
 */
export async function doesStaffIdExist(staff_id) {
  let query = "SELECT * FROM Student WHERE staff_id = $1";
  let params = [staff_id];
  let res = await db.query(query, params);
  if (res.rows.length) return true;
  else return false;
}

export async function activateAccount(staff_id, email, password ) {
  let query = "UPDATE Student SET email = $1, active = '1', password=$2 WHERE staff_id = $3";
  let params = [email, password, staff_id];
  let res = await db.query(query, params);
  return res.rowCount;
}

export async function getLecturerWithStaffId(staff_id) {
  let query = "SELECT * FROM Student WHERE staff_id = $1";
  let params = [staff_id];
  return await db.query(query, params);
}

export async function getLecturerWithEmail(email){
  let query = "SELECT * FROM Student WHERE email = $1";
  let params = [email];
  return await db.query(query, params);
}
