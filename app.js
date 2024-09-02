const express = require('express')
const cors = require('cors')


const app = express()
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

const loginRoutes = require('./routes/login')
const signupRoutes = require('./routes/signup')
const getProfessorLecturesRoutes = require('./routes/getProfessorLectures')
const getProfessorLecturePostsRoutes = require('./routes/getProfessorLecturePosts')
const insertLecturePostRoutes = require('./routes/insertLecturePost')
const getStudentLecturesRoutes = require('./routes/getStudentLectures')
const getAllLecturesRoutes = require('./routes/getAllLectures')
const insertRegisterRoutes = require('./routes/insertRegister')
const getStudentLecturePostsRoutes = require('./routes/getStudentLecturePosts')
const deleteRegisterRoutes = require('./routes/deleteRegister')
const deleteLecturePostRoutes = require('./routes/deleteLecturePost')

app.use("/login", loginRoutes)
app.use("/signup", signupRoutes)
app.use("/getProfessorLectures", getProfessorLecturesRoutes)
app.use("/getProfessorLecturePosts", getProfessorLecturePostsRoutes)
app.use("/insertLecturePost", insertLecturePostRoutes)
app.use("/getStudentLectures", getStudentLecturesRoutes)
app.use("/getAllLectures", getAllLecturesRoutes)
app.use("/insertRegister", insertRegisterRoutes)
app.use("/getStudentLecturePosts", getStudentLecturePostsRoutes)
app.use("/deleteRegister", deleteRegisterRoutes)
app.use("/deleteLecturePost", deleteLecturePostRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});