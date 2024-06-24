const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

// Middleware to log request path and method
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Importing routes
const adminRoute = require('./routes/adminRoute.js')
const levelRoute = require('./routes/levelRoute');
const centerRoute = require('./routes/centerRoute');
const collegeRoute = require('./routes/collegeRoute');
const lectureRoute = require('./routes/lectureRoute');
const roomRoute = require('./routes/roomRoute');
const scheduleRoute = require('./routes/scheduleRoute');
const sectionRoute = require('./routes/sectionRoute');
const subjectRoute = require('./routes/subjectRoute');
const authRoutes = require('./routes/userRoute'); 
const taRoutes = require('./routes/TARoute'); 
const doctorRoutes = require('./routes/doctorRoute'); 
const studentRoutes = require('./routes/studentRoute.js'); 
// Using routes
app.use('/api/admin', adminRoute)
app.use('/api/ta', taRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/levels', levelRoute);
app.use('/api/centers', centerRoute);
app.use('/api/colleges', collegeRoute);
app.use('/api/lectures', lectureRoute);
app.use('/api/rooms', roomRoute);
app.use('/api/schedules', scheduleRoute);
app.use('/api/sections', sectionRoute);
app.use('/api/subjects', subjectRoute);
app.use('/api/doctor', doctorRoutes);
app.use('/api/student', studentRoutes);
// Connect to database and start server
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(4000, () => {
            console.log("Listening on port 4000");
        });
    })
    .catch((error) => {
        console.log(error);
    });
