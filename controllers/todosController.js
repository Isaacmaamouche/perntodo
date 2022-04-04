const pool = require('../db');
const resetDB = require('../utils/resetDB');

exports.getTodos = async (req, res) => {
  try {
    const allTodos = await pool.query(
      'SELECT description, todo_id FROM todo ORDER BY todo_id'
    );
    res.status(200).json(allTodos.rows);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.resetTodos = async (req, res) => {
  try {
    resetDB();
    res.status(200);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getOneTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const aTodo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);
    res.status(200).json(aTodo.rows[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  console.log(description);

  try {
    await pool.query('UPDATE todo SET description =$1 WHERE todo_id = $2', [
      description,
      id,
    ]);

    const aTodo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);
    res.status(200).json({ message: 'todo was updated', todo: aTodo.rows[0] });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);

    res.status(200).json({ message: 'todo was deleted' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
