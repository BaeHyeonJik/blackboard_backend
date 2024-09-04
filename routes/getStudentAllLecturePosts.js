const express = require('express');
const Pool = require('../mysql');
const router = express.Router();

router.get('/:student_id', async (req, res) => {
  const connection = await Pool.getConnection();
  console.log(req.params);
  const {student_id} = req.params;
  try{
    const list = await connection.query(
      `SELECT boards.id as board_id, lectures.title, boards.post_title, boards.content, boards.created_at, users.name as prof_name
      FROM blackboard.boards 
      JOIN blackboard.users ON boards.prof_id = users.id
      JOIN blackboard.registers ON boards.lecture_id = registers.lecture_id
      JOIN blackboard.lectures ON boards.lecture_id = lectures.id
      WHERE registers.student_id = ?
      ORDER BY boards.created_at DESC`,
      [student_id]
    ).then(([v]) => {
      return v.map((t) => {
        t.created_at = t.created_at.toISOString().slice(0, 19).replace('T', ' ');
        return {
          board_id: t.board_id,
          lecture_title: t.title,
          prof_name: t.prof_name,
          post_title: t.post_title,
          content: t.content,
          created_at: t.created_at
        }
      })
    })
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



  