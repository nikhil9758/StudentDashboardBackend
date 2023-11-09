// src/routes/courseRoutes.ts
const express =require( 'express')
const { retrieveCourseList, retrieveCourseDetails } =require( '../controllers/courseController')

const router = express.Router();
console.log("here")
// Define your course-related routes
router.get('/', retrieveCourseList);
router.get('/:courseId', retrieveCourseDetails);

module.exports= router;