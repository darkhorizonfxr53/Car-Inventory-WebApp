// controllers/carController.js
const Car = require('../models/car');

// Add a car to the cars collection
exports.addCar = async (req, res) => {
  try {
    const { make, model, registrationNumber, currentOwner, manufacturingYear } = req.body;
    const car = new Car({
      make,
      model,
      registrationNumber,
      currentOwner,
      manufacturingYear,
    });
    await car.save();
    res.status(201).json({ message: 'Car added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to add car' });
  }
};

// Update information about a single car
exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { make, model, registrationNumber, currentOwner, manufacturingYear } = req.body;
    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { make, model, registrationNumber, currentOwner, manufacturingYear },
      { new: true }
    );
    if (!updatedCar) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update car' });
  }
};

// Update information about more than one car
exports.updateMultipleCars = async (req, res) => {
  try {
    const { cars } = req.body;
    const promises = cars.map((car) =>
      Car.findByIdAndUpdate(car.id, car, { new: true })
    );
    const updatedCars = await Promise.all(promises);
    res.json(updatedCars);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update cars' });
  }
};

// Delete a specific document
exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(deletedCar);
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete car' });
  }
};

// List all the information for all cars in the database
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch cars' });
  }
};

// List model, make, registration number, and current owner for cars older than 5 years
exports.getCarsOlderThan5Years = async (req, res) => {
  try {
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
    const cars = await Car.find({ manufacturingYear: { $lt: fiveYearsAgo } }).select(
      'make model registrationNumber currentOwner'
    );
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch cars' });
  }
};