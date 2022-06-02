const express = require('express');
const app = express();
const PATH = require('path');
const cors = require('cors');
const todosRoutes = require('./routes/todos');
const resetDB = require('./utils/resetDB');
const PORT = process.env.PORT || 5000;

var cron = require('node-cron');
cron.schedule('10 * * * * *', () => {
  // cron.schedule('55 */9 * * * *', () => {
  // running db reset every 10 minutes
  console.log('db reset from cron');
  resetDB();
});

//middleware
app.use(cors());
app.use(express.json()); //req.body

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(PATH.join(__dirname, 'client/build')));
  console.log('server running in production');
}
// to use static serving in dev mode as well
// app.use(express.static(PATH.join(__dirname, 'client/build')));

//routes
app.use('/', todosRoutes);

app.get('*', (req, res) => {
  res.sendFile(PATH.join(__dirname, 'client/build/index.html'));
});

//app listens
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'coucou' });
});
