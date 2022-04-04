const pool = require('../db');

async function resetDB() {
  await pool.query('DELETE FROM todo');
  for (i = 0; i < 5; i++) {
    await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [
      `Todo item ${i + 1}`,
    ]);
  }
}

module.exports = resetDB;
