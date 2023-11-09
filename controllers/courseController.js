
// import admin from 'firebase-admin';
const courseItem = require('../mockdata/courseData')

const retrieveCourseList = async (req, res) => {
    console.log("controll.............")    
  try {
    // const coursesSnapshot = await admin.firestore().collection('courses').get();
    // const courses = coursesSnapshot.docs.map((doc) => doc.data());
    console.log(courseItem)
    return res.json(courseItem);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve course list.' });
  }
};

const retrieveCourseDetails = async (req, res) => {
  const courseId = req.params.courseId;
  console.log(typeof courseId)
  try {
    // const courseDoc = await admin.firestore().collection('courses').doc(courseId).get();
    // if (!courseDoc.exists) {
    //   return res.status(404).json({ error: 'Course not found.' });
    // }
    // return res.json(courseDoc.data());

    return res.json(courseItem.Courses.find((course)=>course.id.toString()===courseId))

  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve course details.' });
  }
};
module.exports={retrieveCourseList,retrieveCourseDetails}