import {
  getAllAnnouncementsFromDB,
  getAllCoursesFromDB,
} from "../models/apiModel.js";

export const getAllAnnouncements = async (req, res) => {
  try {
    res.json(await getAllAnnouncementsFromDB());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    res.json(await getAllCoursesFromDB());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
