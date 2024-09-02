const express = require('express');
const Pool = require('../mysql');
const router = express.Router();

router.delete('/:lecture_id/:student_id', async (req, res) => {
  const connection = await Pool.getConnection();
  console.log(req.params);
  const {lecture_id, student_id} = req.params;
  try{
    await connection.query(
      `DELETE FROM blackboard.registers WHERE registers.lecture_id = ? AND registers.student_id = ?`,
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



  