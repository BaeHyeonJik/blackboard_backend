const express = require('express');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const Pool = require('../mysql');
const router = express.Router();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}

const comparePassword = async (password, hash) => {
    const isResult = await bcrypt.compare(password, hash);
    return isResult;
}

router.post('/', cors(corsOptions), async (req, res) => {
  const connection = await Pool.getConnection();
  console.log(req.body);
  let {user_id, password} = req.body;



  try {
    user_id = user_id.trim();
    password = password.trim();
    const user_Info = await connection.query(
      `SELECT * FROM blackboard.users WHERE user_id = ?`, 
      [user_id]
    ).then(([[v]]) => {
      return {
        id: v.id,
        user_id: v.user_id,
        password: v.password,
        name: v.name,
        role: v.role
      }
    });

    const is_correct = user_Info?.password ? await comparePassword(password, user_Info.password) : false;

    if (!is_correct) {          
      const response = {
        statusCode: 409,
      }
      console.log(response);
      res.status(200).json(response);
      return;
    }     
    const response = {
      statusCode: 200,
      user_Info,
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
