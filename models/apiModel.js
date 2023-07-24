import * as db from "./postgresql.js";

/**
 * function to get all announcments from the database
 * @returns {list} a list of course data objects
 */
export async function getAllAnnouncementsFromDB() {
  let query =
    "SELECT Announcement.time_stamp, Announcement.title, Announcement.content, CONCAT(Lecturer.last_name, ' ', Lecturer.other_names) AS poster_name FROM Announcement LEFT JOIN Lecturer ON Announcement.poster_id = Lecturer.staff_id ORDER BY Announcement.time_stamp;";
  return (await db.query(query)).rows;
}

/**
 * function to get all announcments from the database
 * @returns {list} a list of course data objects
 */
export async function getAllCoursesFromDB() {
  let query =
    "SELECT Course.course_code, Course.title, Course.credit_hour, Course.reference_link, CONCAT(Lecturer.last_name, ' ', Lecturer.other_names) AS lecturer_name FROM COURSE INNER JOIN Lecturer ON Course.lecturer_id = Lecturer.staff_id";
  return (await db.query(query)).rows;
}
