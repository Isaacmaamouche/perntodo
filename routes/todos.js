const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todosController');

router.get('/todos', todosController.getTodos);
router.get('/todos/reset', todosController.resetTodos);
router.get('/todos/:id', todosController.getOneTodo);
router.post('/todos', todosController.createTodo);
router.put('/todos/:id', todosController.updateTodo);
router.delete('/todos/:id', todosController.deleteTodo);

module.exports = router;
