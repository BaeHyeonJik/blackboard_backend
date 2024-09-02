const express = require('express');
const Pool = require('../mysql');
const router = express.Router();

router.get('/', async (req, res) => {
  const connection = await Pool.getConnection();
  try{
    const [list] = await connection.query(
      `SELECT lectures.id, Users.name as prof_name, lectures.title, lectures.credit, COUNT(registers.student_id) AS studentnum, lectures.limitednum,
       IF(lectures.limitednum = COUNT(registers.student_id), '마감', '모집중') AS status
      FROM blackboard.lectures
        JOIN blackboard.Users ON lectures.prof_id = Users.id
        LEFT JOIN blackboard.registers ON lectures.id = registers.lecture_id
      GROUP BY lectures.id`
    );
    const response = {
      statusCode: 200,
      list,
    }
    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    const response = {
      statusCode: 400,
      err
    }
    res.status(400).json(response);
  } finally {
    connection.release();
  }
});

module.exports = router;



  