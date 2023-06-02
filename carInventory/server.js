// server.js
const express = require('express');
const mongoose = require('mongoose');
const carRoutes = require('./routes/carRoutes')

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/carInventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use('/api/cars', carRoutes)

// Routes and CRUD operations go here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});