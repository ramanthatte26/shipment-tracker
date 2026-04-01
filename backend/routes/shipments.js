const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Shipment = require('../models/Shipment');

//POST API
router.post('/', async (req, res) => {
  try {
    const { senderName, receiverName, origin, destination, weight } = req.body;

    if (!senderName || !receiverName || !origin || !destination) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const trackingId = 'TRK--' + uuidv4().slice(0, 8).toUpperCase();

    const newShipment = new Shipment({
      trackingId,
      senderName,
      receiverName,
      origin,
      destination,
      weight,
    });

    await newShipment.save();

    res.status(201).json(newShipment);
  } catch (err) {
    console.error("POST ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


//GET ALL
router.get('/', async (req, res) => {
  try {
    const shipments = await Shipment.find().sort({ createdAt: -1 });
    res.json(shipments);
  } catch (err) {
    console.error("GET ALL ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// GET By Id
router.get('/:trackingID', async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      trackingId: req.params.trackingID
    });

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.json(shipment);
  } catch (err) {
    console.error("GET ONE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


//UPDATE STATUS
router.put('/:trackingID', async (req, res) => {
  try {
    const { status } = req.body;

    const shipment = await Shipment.findOneAndUpdate(
      { trackingId: req.params.trackingID },
      { status },
      { new: true }
    );

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.json(shipment);
  } catch (err) {
    console.error("PUT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;