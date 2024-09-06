const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const loginRoutes = require('./routes/login')
const signupRoutes = require('./routes/signup')
const insertCourseRoutes = require('./routes/insertCourse')
const getProfessorLecturesRoutes = require('./routes/getProfessorLectures')
const getProfessorLecturePostsRoutes = require('./routes/getProfessorLecturePosts')
const insertLecturePostRoutes = require('./routes/insertLecturePost')
const getStudentAllLecturePostsRoutes = require('./routes/getStudentAllLecturePosts')
const getStudentLecturesRoutes = require('./routes/getStudentLectures')
const getAllLecturesRoutes = require('./routes/getAllLectures')
const insertRegisterRoutes = require('./routes/insertRegister')
const getStudentLecturePostsRoutes = require('./routes/getStudentLecturePosts')
const deleteRegisterRoutes = require('./routes/deleteRegister')
const deleteLecturePostRoutes = require('./routes/deleteLecturePost')

app.use("/login", loginRoutes)
app.use("/signup", signupRoutes)
app.use("/insertCourse", insertCourseRoutes)
app.use("/getProfessorLectures", getProfessorLecturesRoutes)
app.use("/getProfessorLecturePosts", getProfessorLecturePostsRoutes)
app.use("/insertLecturePost", insertLecturePostRoutes)
app.use("/getStudentAllLecturePosts", getStudentAllLecturePostsRoutes)
app.use("/getStudentLectures", getStudentLecturesRoutes)
app.use("/getAllLectures", getAllLecturesRoutes)
app.use("/insertRegister", insertRegisterRoutes)
app.use("/getStudentLecturePosts", getStudentLecturePostsRoutes)
app.use("/deleteRegister", deleteRegisterRoutes)
app.use("/deleteLecturePost", deleteLecturePostRoutes)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});