const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Routes for room CRUD operations
router.post('/', roomController.createRoom);
router.post('/bulk', roomController.createRoomsBulk);
router.get('/', roomController.getAllRooms);
router.get('/:id', roomController.getRoomById);
router.put('/:id', roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);

module.exports = router;