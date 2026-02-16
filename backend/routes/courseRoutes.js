import expres from "express";
import { getCourses, getCourse, createCourse, updateCourse, deleteCourse, searchCourse } from "../controllers/courseController.js";

const router = expres.Router();

router.get("/", getCourses); //fetch all the Courses
router.get("/:id", getCourse); //get a prod
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.get("/search/:str", searchCourse); // here search so the user knows which route, bcoz id bhi ho sakta th astr ki jaga, BE doesnt know what, it just looks for a route
// baki sab me either "/" and "/:id" ka difference hai, ya post/out/get
// this has get and /:something, so might confuse with getCourse !! 
// : is to indicate placwholder btw
export default router;