const pool = require('../db');

const CreateRamdomDate = (i) => {
  const d = i - 2;
  const toDate = new Date();
  toDate.setDate(toDate.getDate() + d);
  const year = toDate.getFullYear();
  const month = toDate.getMonth() + 1;
  const date = toDate.getDate();
  return `${year}-${month > 9 ? month : '0' + month}-${
    date > 9 ? date : '0' + date
  }`;
};

async function resetDB() {
  await pool.query('DELETE FROM todo');
  for (i = 0; i < 5; i++) {
    await pool.query(
      "INSERT INTO todo (description, emoji, date, completed, tag, title) VALUES($1, '🙊', $2, false, ARRAY['test', 'important', 'prod'], $3) RETURNING *",
      [`Todo desc of item ${i + 1}`, CreateRamdomDate(i), `todo titre ${i + 1}`]
    );
  }
}

module.exports = resetDB;

//INSERT INTO todo (description, emoji, date, completed, tag, title) VALUES($1, '🙊', '2022-04-29', false, ARRAY['test', 'important', 'prod'], $2) RETURNING *, [`Todo desc of item ${i + 1}`,`todo titre ${i + 1}`]

//INSERT INTO todo (description, emoji, date, completed, tag, title) VALUES('todo desc', '🙊', '2022-04-29', false, ARRAY['test', 'important', 'prod'], 'todo titre');
// # alter todo alter column emoji TYPE
