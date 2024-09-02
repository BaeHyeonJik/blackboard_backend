const express = require('express');
const Pool = require('../mysql');
const router = express.Router();

router.post('/', async (req, res) => {
  const connection = await Pool.getConnection();
  console.log(req.body);
  const {lecture_id, student_id } = req.body;
  try{
    const [register_info] = await connection.query(
      `SELECT * FROM blackboard.registers WHERE registers.lecture_id = ? AND registers.student_id = ?`,
      [lecture_id, student_id]
    )
    if(register_info.length > 0){
      const response = {
        statusCode: 409,
        err: '이미 등록된 수업입니다.'
      }
      console.log(response);
      res.status(409).json(response);
      return;
    }
    await connection.query(
      `INSERT INTO blackboard.registers (lecture_id, student_id) VALUES (?, ?)`,
      [lecture_id, student_id]
    )
    const response = {
      statusCode: 200,
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



  