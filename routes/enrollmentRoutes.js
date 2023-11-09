// src/routes/enrollmentRoutes.ts
const express = require('express')
const { enrollInCourse, retrieveEnrolledCourses, getCourseStatus, markCourseCompleted, createEnrolledCourses } = require('../controllers/enrollmentController')

const router = express.Router();
console.log("here.........")
console.log("error7......")
// Define your enrollment-related routes
router.post('/enroll', enrollInCourse);
router.post('/createcourse', createEnrolledCourses);
router.get('/:studentId/enrolled-courses', retrieveEnrolledCourses);
router.get('/:studentId/:courseId/course-status', getCourseStatus);
router.post('/course-mark-completed', markCourseCompleted);

module.exports=router;