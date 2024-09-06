const express = require('express');
const Pool = require('../mysql');
const router = express.Router();

router.get('/:lecture_id', async (req, res) => {
  const connection = await Pool.getConnection();
  console.log(req.params);
  const {lecture_id} = req.params;
  try{
    const [list] = await connection.query(
      `SELECT users.id, users.name, users.num
      FROM blackboard.users
        JOIN blackboard.registers ON users.id = registers.student_id
      WHERE registers.lecture_id = ?`,
      [lecture_id]
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



  