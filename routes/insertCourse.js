const express = require('express');
const Pool = require('../mysql');
const router = express.Router();

router.post('/', async (req, res) => {
  const connection = await Pool.getConnection();
  console.log(req.body);
  const {prof_id, title, limitednum, credit} = req.body;
  try{
    await connection.query(
      `INSERT INTO blackboard.lectures (prof_id, title, limitednum, credit) VALUES (?, ?, ?, ?)`,
      [prof_id, title, limitednum, credit]
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



  