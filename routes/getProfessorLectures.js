const express = require('express');
const Pool = require('../mysql');
const router = express.Router();

router.get('/:prof_id', async (req, res) => {
  const connection = await Pool.getConnection();
  console.log(req.params);
  const {prof_id} = req.params;
  try{
    const [list] = await connection.query(
      `SELECT lectures.id, lectures.title, lectures.credit, COUNT(registers.student_id) AS studentnum, lectures.limitednum
      FROM blackboard.lectures
        LEFT JOIN blackboard.registers ON lectures.id = registers.lecture_id
      WHERE lectures.prof_id = ?
      GROUP BY lectures.id`,
      [prof_id]
    )
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



  