const express = require('express');
const app = express();
const PATH = require('path');
const cors = require('cors');
const todosRoutes = require('./routes/todos');
const resetDB = require('./utils/resetDB');
const PORT = process.env.PORT || 5000;

var cron = require('node-cron');
cron.schedule('*/10 * * * *', () => {
  console.log('running db reset every 10 minutes');
  resetDB();
});

//middleware
app.use(cors());
app.use(express.json()); //req.body

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(PATH.join(__dirname, 'client/build')));
}
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
