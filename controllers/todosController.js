const pool = require('../db');
const resetDB = require('../utils/resetDB');

exports.getTodos = async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo ORDER BY todo_id');
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
  const { formData } = req.body;
  // console.log(formData);
  try {
    const keyValues = Object.entries(formData);

    let SQLKey = [];
    keyValues.forEach((pair, index) =>
      SQLKey.push(`${pair[0]} = $${index + 1}`)
    );

    let SQLValues = [];
    keyValues.forEach((pair) => {
      if (pair[0] == 'tag') {
        //la valeur de tag a besoin d'une reconstruction pour correspondre au data type de la bd
        let pair1 = pair[1]
          .trim()
          .split(',')
          .filter((item) => item.length > 0)
          .map((item) => item.trim());

        const stringToArrayQuerie = `{${pair1.join(', ')}}`;
        SQLValues.push(stringToArrayQuerie);
      } else {
        SQLValues.push(`${pair[1]}`);
      }
    });

    let SQLQuerie = `UPDATE todo SET ${SQLKey.join(', ')} WHERE todo_id=$${
      keyValues.length + 1
    }`;

    const query = {
      // give the query a unique name
      name: 'updateTodo',
      text: SQLQuerie,
      values: [...SQLValues, id],
    };

    // console.log(query);

    await pool.query(query);
    // await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [
    //   description,
    //   id,
    // ]);

    const aTodo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);
    res.status(200).json({ message: 'todo was updated', todo: aTodo.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'oups - something went wrong' });
  }
};

exports.createTodo = async (req, res) => {
  const { formData } = req.body;
  // console.log(formData);
  try {
    const keyValues = Object.entries(formData);

    let SQLKey = Object.keys(formData);

    let SQLValues = [];
    keyValues.forEach((pair) => {
      if (pair[0] == 'tag') {
        //la valeur de tag a besoin d'une reconstruction pour correspondre au data type de la bd
        let pair1 = pair[1]
          .trim()
          .split(',')
          .filter((item) => item.length > 0)
          .map((item) => item.trim());

        const stringToArrayQuerie = `{${pair1.join(', ')}}`;
        SQLValues.push(stringToArrayQuerie);
      } else {
        SQLValues.push(`${pair[1]}`);
      }
    });
    //INSERT INTO todo (description) VALUES($1) RETURNING *
    let SQLQuerieValue = [];
    keyValues.forEach((pair, index) => SQLQuerieValue.push(`$${index + 1}`));
    let SQLQuerie =
      'INSERT INTO todo (' +
      SQLKey.join(', ') +
      ') VALUES(' +
      SQLQuerieValue.join(', ') +
      ') RETURNING *';

    const query = {
      // give the query a unique name
      name: 'createTodo',
      text: SQLQuerie,
      values: SQLValues,
    };

    // console.log(query);

    // const newTodo = await pool.query(
    //   'INSERT INTO todo (description) VALUES($1) RETURNING *',
    //   [description]
    // );

    // await pool.query(query);
    await pool
      .query(query)
      .then((newTodo) =>
        res
          .status(200)
          .json({ message: 'todo was created', todo: newTodo.rows[0] })
      );
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
