// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Update with your actual service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://logindemo-a1d5e-default-rtdb.firebaseio.com/',
  storageBucket: 'gs://logindemo-a1d5e.appspot.com', // Update with your actual Firebase Storage bucket URL
});

const app = express();
const port = 5000;

app.use(cors());
app.use((req,res,next)=>{console.log("here1");
 next()
})
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/',(req,res)=>{
    res.send("hello.......")
})

app.post('/upload', upload.single('file'), async (req, res) => {
    console.log("fliereueted here...")
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const bucket = admin.storage().bucket();
    const fileBuffer = req.file.buffer;
    const fileName = Date.now() + path.extname(req.file.originalname);
    const file = bucket.file(fileName);

    await file.save(fileBuffer, {
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
   
    // Here, you might want to save the publicUrl or other file information in your database
       // Save file information in Firebase Realtime Database
       const fileData = {
        name: req.file.originalname,
        url: publicUrl,
        timestamp: admin.database.ServerValue.TIMESTAMP,
      };
  
      const newFileRef = filesRef.push();
      await newFileRef.set(fileData);
  
    return res.status(200).json({ message: 'File uploaded successfully', url: publicUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
