// client/src/App.js
import React, { useEffect, useState } from 'react';

const App = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const response = await fetch('/api/cars');
    const data = await response.json();
    setCars(data);
  };

  return (
    <div>
      <h1>Car Inventory</h1>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            {car.make} {car.model} - {car.registrationNumber} ({car.currentOwner})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;