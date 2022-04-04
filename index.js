const express = require('express');
const app = express();
const cors = require('cors');
const todosRoutes = require('./routes/todos');
const resetDB = require('./utils/resetDB');
const PORT = process.env.PORT || 5000;
// require('dotenv').config();

var cron = require('node-cron');
cron.schedule('*/10 * * * *', () => {
  console.log('running db reset every 10 minutes');
  resetDB();
});

//middleware
app.use(cors());
app.use(express.json()); //req.body

if (process.env.NODE_ENV === 'production') {
}

//routes
app.use('/', todosRoutes);

//app listens
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'coucou' });
});
