const Room = require('../models/room');

// Controller for creating a new room
exports.createRoom = async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// create rooms bulk creation
exports.createRoomsBulk = async (req, res) => {
  const roomsData = req.body.rooms;

  // Validate each room
  const validationErrors = [];
  const validRooms = [];

  roomsData.forEach((roomData, index) => {
    const room = new Room(roomData);
    const error = room.validateSync();
    if (error) {
      validationErrors.push({ index, message: error.message });
    } else {
      validRooms.push(roomData);
    }
  });

  if (validationErrors.length > 0) {
    return res.status(400).json({ validationErrors });
  }

  try {
    const newRooms = await Room.insertMany(validRooms);
    res.status(201).json(newRooms);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Controller for getting all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('center').populate('lecture').populate('section');
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting a single room
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('center').populate('lecture').populate('section');
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for updating a room
exports.updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for deleting a room
exports.deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};