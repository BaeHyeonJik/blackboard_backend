const express = require('express');
const bcrypt = require("bcryptjs");
const Pool = require('../mysql');
const router = express.Router();

const comparePassword = async (password, hash) => {
    const isResult = await bcrypt.compare(password, hash);
    return isResult;
}

router.post('/', async (req, res) => {
  const connection = await Pool.getConnection();
  console.log(req.body);
  let {user_id, password} = req.body;
  try{
    user_id = user_id.trim();
    password = password.trim();
    const [[userInfo]] = await connection.query(
      `SELECT * FROM blackboard.users WHERE user_id = ?`, 
      [user_id]
    )
    const is_correct = userInfo?.password ? await comparePassword(password, userInfo.password) : false;

    if(!is_correct){          
      const response = {
        statusCode: 409,
      }
      console.log(response);
      res.status(409).json(response);
      return;
    }  
    
    const user_Info = {
      id: userInfo.id,
      name: userInfo.name,
      role: userInfo.role
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
    console.log(response);
    res.status(400).json(response);
  } finally {
    connection.release();
  }
});

module.exports = router;



  