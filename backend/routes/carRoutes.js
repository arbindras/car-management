const express = require("express");
const Car = require("../models/Car");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

// Create a car
router.post("/", async (req, res) => {
  const { title, description, tags, images } = req.body;

  try {
    const car = new Car({
      user: req.user._id,
      title,
      description,
      tags,
      images,
    });
    await car.save();
    res
      .status(201)
      .json({ message: "Car created successfully", carId: car._id });
  } catch (error) {
    res.status(500).json({ message: "Error creating car" });
  }
});

// List all cars for the authenticated user
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user._id });
    res.json({ cars });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cars" });
  }
});

// Get a single car by ID
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json({ car });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving car" });
  }
});

// Update a car
router.put("/:id", async (req, res) => {
  const { title, description, tags, images } = req.body;

  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    car.title = title || car.title;
    car.description = description || car.description;
    car.tags = tags || car.tags;
    car.images = images || car.images;
    await car.save();

    res.json({ message: "Car updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating car" });
  }
});

// Delete a car
router.delete("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await car.remove();
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting car" });
  }
});

module.exports = router;
