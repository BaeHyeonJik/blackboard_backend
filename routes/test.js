const express = require('express');
const bcrypt = require("bcryptjs");
const Pool = require('../mysql');
const router = express.Router();


router.get('/', async (req, res) => {
  const connection = await Pool.getConnection();
  try{
   const response = {
      statusCode: 200,
    }
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



  