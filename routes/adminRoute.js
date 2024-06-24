const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/generate-schedule', adminController.generateschedule);
router.post('/generate-sections-schedule', adminController.generateSectionsschedule);

module.exports = router;
