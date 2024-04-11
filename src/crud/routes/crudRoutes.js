const express = require('express');
const router = express.Router();
const crudController = require('../controllers/crudController');

router.get('/', crudController.getAllTasks);
router.get('/:id', crudController.getTaskById);
router.post('/', crudController.createTask);
router.put('/:id', crudController.updateTask);
router.delete('/:id', crudController.deleteTask);

module.exports = router;
