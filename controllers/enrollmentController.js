// // src/controllers/enrollmentController.ts
const admin= require('firebase-admin')

const enrollInCourse = async (req, res) => {
  const { courseId, studentId } = req.body;
  try {
    console.log(courseId,studentId)
    // const studentDoc = admin.firestore().collection('user').doc(studentId);
    // console.log(studentDoc)
    const studentDocSnapshot = await admin.firestore().collection('user').doc(studentId).get();
    // console.log("data",studentDocSnapshot.data().enrolledcourses)
    const enrolledcourses=studentDocSnapshot.data().enrolledcourses
    let courses=[]
    courses= [...enrolledcourses,courseId]
    console.log("couses",courses)
     await admin.firestore().collection('user').doc(studentId).set({enrolledcourses:courses})
    // const enrolledCoursesRef = studentDoc.collection('enrolled-courses');
    // const courseDoc = await admin.firestore().collection('courses').doc(courseId).get();
    // if (!courseDoc.exists) {
    //   return res.status(404).json({ error: 'Course not found.' });
    // }

    // const isAlreadyEnrolled = (await enrolledCoursesRef.doc(courseId).get()).exists;
    // if (isAlreadyEnrolled) {
    //   return res.status(400).json({ error: 'Student is already enrolled in this course.' });
    // }

    // await enrolledCoursesRef.doc(courseId).set(courseDoc.data());
    return res.json({ message: 'Enrolled successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to enroll in the course.' });
  }
};

const retrieveEnrolledCourses = async (req, res) => {
  const studentId = req.params.studentId;
  console.log(studentId)
  try {
    const studentDocSnapshot = await admin.firestore().collection('user').doc(studentId).get();
    console.log(studentDocSnapshot.data().enrolledcourses)
    // const data=studentDoc.docs.map((doc)=> doc.data())
    // console.log("here....",data)
    // const enrolledCoursesSnapshot = await studentDoc.collection('enrolled-courses').get();
    // const enrolledCourses = enrolledCoursesSnapshot.docs.map((doc) => doc.data());
    return res.json({enrolledcourses:studentDocSnapshot.data().enrolledcourses});
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve enrolled courses.' });
  }
};

const getCourseStatus= async(req,res)=>{
    try{
        const studentId = req.params.studentId;
        const courseId= req.params.courseId
        const studentDocSnapshot = await admin.firestore().collection('usercourse').get();
        let iscompleted=false
        await studentDocSnapshot.docs.forEach((doc)=>{
            if(doc.data().studentId===studentId && doc.data().courseId.toString()=== courseId){
                iscompleted=doc.data().iscompleted
            }
        })
        res.json({iscompleted})
    }catch(error){
        console.log(error)
    }
}

const markCourseCompleted= async(req,res)=>{
    try {
        console.log(req.body)
        const {studentId,courseId} = req.body;
        const db= admin.firestore()
        const batch= db.batch()
        let docId=''
        const query = await db.collection('usercourse').where('studentId','==',studentId).where("courseId",'==',courseId)
        query.get().then(async (snapshot)=>{
            snapshot.forEach(async (doc)=>{
                docId=doc.id
                console.log("herer.....",doc.id)
                const docRef= db.collection('usercourse').doc(doc.  id)
                await batch.update(docRef,{'iscompleted': true})
            })
           return await batch.commit()
        }).then(async ()=>{
            const getUpdatedStatus=await admin.firestore().collection('usercourse').doc(docId).get()
            // getUpdatedStatus.then((res)=>{
            //     console.log(res)
            // })
            console.log("id..........",getUpdatedStatus.data())
            console.log('Batch updated')
            res.json(getUpdatedStatus.data())
        }).catch((error)=>{
            console.log(error)
        })
        
        // res.json({message:'updated successfully'})
    } catch (error) {
        console.log(error)
    }
}
module.exports={enrollInCourse,retrieveEnrolledCourses, getCourseStatus, markCourseCompleted}