const express = require('express');
const Pool = require('../mysql');
const router = express.Router();

router.get('/:lecture_id', async (req, res) => {
  const connection = await Pool.getConnection();
  console.log(req.params);
  const {lecture_id} = req.params;
  try{
    const list = await connection.query(
      `SELECT boards.id as board_id, boards.post_title, boards.content, boards.created_at, users.name as prof_name
      FROM blackboard.boards 
      JOIN blackboard.users ON boards.prof_id = users.id
      WHERE boards.lecture_id = ?
      ORDER BY boards.created_at DESC`,
      [lecture_id]
    ).then(([v]) => {
      return v.map((t) => {
        t.created_at = t.created_at.toISOString().slice(0, 19).replace('T', ' ');
        return {
          board_id: t.board_id,
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



  