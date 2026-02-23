import express from "express";
import { getCourses, getCourse, createCourse, updateCourse, deleteCourse, searchCourse } from "../controllers/courseController.js";

const router = express.Router();


router.get("/:uid", getCourses); //fetch all the Courses
router.post("/:uid", createCourse);

router.get("/:uid/search/:str", searchCourse); // here search so the user knows which route, bcoz id bhi ho sakta th astr ki jaga, BE doesnt know what, it just looks for a route

router.get("/:uid/:cid", getCourse);
router.put("/:uid/:cid", updateCourse);
router.delete("/:uid/:cid", deleteCourse);

// baki sab me either "/" and "/:id" ka difference hai, ya post/out/get
// this has get and /:something, so might confuse with getCourse !! 
// : is to indicate placwholder btw
export default router;