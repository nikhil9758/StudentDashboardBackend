// src/app.ts 
const express =require('express')
const cors =require('cors')
console.log("here")
const courseRoutes =require('./routes/courseRoutes')
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const admin= require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json');
// Initialize Express application
const app = express();

// Configure Cross-Origin Resource Sharing (CORS) to allow requests from your frontend
app.use(cors({
    origin:["http://localhost:3000",
    "https://student-dashboard-frontend.vercel.app/"]
}));

// app.use('/enrollments/enroll',(req,res)=>{
//     console.log(req,"api...")
// })

// Initialize Firebase Admin SDK with your service account key
// const serviceAccount = require('./serviceAccountKey.json');
const firebaseapp=admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://logindemo-a1d5e-default-rtdb.firebaseio.com/',
});

// console.log(firebaseapp)

// Parse incoming JSON requests
app.use(express.json());

// Define your API routes
app.use('/courses', courseRoutes);
app.use('/enrollments', enrollmentRoutes);

const port = process.env.port||8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});