const { createTask, fetchAllTasks, updateTaskById, deleteTaskById } = require('../controllers/TaskController');

const router = require('express').Router();
//to get all tasks
router.get('/',fetchAllTasks)
//to create tasks

router.post('/',createTask)

router.put('/:id',updateTaskById)

router.delete('/:id',deleteTaskById)

module.exports = router;