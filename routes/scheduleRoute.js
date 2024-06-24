const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// Routes for schedule CRUD operations
router.post('/', scheduleController.createSchedule);
router.get('/', scheduleController.getAllSchedules);
router.get('/:id', scheduleController.getScheduleById);
router.get('/:level/:semester', scheduleController.getScheduleByLevelAndSemester);
router.put('/:id', scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;