import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // optional, for Tailwind

function App() {
  const [city, setCity] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const fetchOutfit = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/outfit?city=${city}`);
      setResult(response.data);
      setError('');
    } catch (err) {
      setResult(null);
      setError('Something went wrong fetching outfit data.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold text-center">Outfit Generator</h1>

        <input
          type="text"
          placeholder="Enter city"
          className="border border-gray-300 rounded px-4 py-2 w-full"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          onClick={fetchOutfit}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
        >
          Get Outfit
        </button>

        {error && <p className="text-red-500">{error}</p>}

        {result && (
          <div className="bg-gray-50 p-4 rounded space-y-2">
            <p><strong>City:</strong> {result.city}</p>
            <p><strong>Condition:</strong> {result.condition}</p>
            <p><strong>Temperature:</strong> {result.temperature.celsius} / {result.temperature.fahrenheit}</p>

            <div>
              <h2 className="font-semibold">Suggested Outfit:</h2>
              <ul className="list-disc ml-6">
                {Object.entries(result.outfit).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
