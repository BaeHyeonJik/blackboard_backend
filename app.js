const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "https://port-0-blackboard-backend-f9ohr2alrkcohsg.sel5.cloudtype.app",
      "http://localhost:3000",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
const getProfessorLecturesRoutes = require('./routes/getProfessorLectures');
const getProfessorLecturePostsRoutes = require('./routes/getProfessorLecturePosts');
const insertLecturePostRoutes = require('./routes/insertLecturePost');
const getStudentLecturesRoutes = require('./routes/getStudentLectures');
const getAllLecturesRoutes = require('./routes/getAllLectures');
const insertRegisterRoutes = require('./routes/insertRegister');
const getStudentLecturePostsRoutes = require('./routes/getStudentLecturePosts');
const deleteRegisterRoutes = require('./routes/deleteRegister');
const deleteLecturePostRoutes = require('./routes/deleteLecturePost');

app.use("/api/login", loginRoutes);
app.use("/api/signup", signupRoutes);
app.use("/api/getProfessorLectures", getProfessorLecturesRoutes);
app.use("/api/getProfessorLecturePosts", getProfessorLecturePostsRoutes);
app.use("/api/insertLecturePost", insertLecturePostRoutes);
app.use("/api/getStudentLectures", getStudentLecturesRoutes);
app.use("/api/getAllLectures", getAllLecturesRoutes);
app.use("/api/insertRegister", insertRegisterRoutes);
app.use("/api/getStudentLecturePosts", getStudentLecturePostsRoutes);
app.use("/api/deleteRegister", deleteRegisterRoutes);
app.use("/api/deleteLecturePost", deleteLecturePostRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
