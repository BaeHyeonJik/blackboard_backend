const express = require('express');
const bcrypt = require("bcryptjs");
const Pool = require('../mysql');
const router = express.Router();

const hashedPassword =  async (password) => {
  const hashed = await bcrypt.hash(password, 10);
  return hashed;
}

router.post('/', async (req, res) => {
  const connection = await Pool.getConnection();
  console.log(req.body);
  const {list} = req.body;
  try{
    const user_id = list.user_id.trim();
    const password = await hashedPassword(list.password.trim());
    const name = list.name.trim();
    const student_id = list.student_id.trim();
    const role = list.role;
    const [user] = await connection.query(
      `SELECT * FROM blackboard.users WHERE users.user_id = ?`, 
      [user_id]
    );
    console.log(user_id, password, name, student_id, role);
    if(user.length === 0){
      await connection.query(
        `INSERT INTO blackboard.users (user_id, password, name, student_id, role) VALUES (?, ?, ?, ?, ?)`,
        [user_id, password, name, student_id, role]
      )
    } else {
      const response = {
        statusCode: 409
      }
      console.log(response);
      res.status(409).json(response);
      return;
    }
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



  