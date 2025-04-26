import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [weather, setWeather] = useState(null);
  const [condition, setCondition] = useState(null);
  const [city, setCity] = useState("Kingston");
  const [country, setCountry] = useState("Canada");
  const [region, setRegion] = useState("Ontario");
  const [inputCity, setInputCity] = useState("");
  const [inputCountry, setInputCountry] = useState("");
  const [inputRegion, setInputRegion] = useState("");
  

  useEffect(() => {
    axios.get('http://localhost:5000/weather', { params: { city, country, region } })
      .then(res => setWeather(res.data))
      .then(res => setCondition(res.data.condition))
      .catch(err => console.error("Error fetching weather:", err));
  }, [city, country, region]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity) setCity(inputCity);
    if (inputCountry) setCountry(inputCountry);
    if (inputRegion) setRegion(inputRegion);
    
    setInputCity("");
    setInputCountry("");
    setInputRegion("");
  };


  return (
    <div style={{ padding: '20px' }}>
      <h1>
        {weather
          ? `${weather.city}, ${weather.region}, ${weather.country}, ${weather.temperature}, ${weather.condition}`
          : "Loading..."}
      </h1>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="city">City: </label>
          <input
            id="city"
            type="text"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            placeholder="Enter city"
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="region">Region: </label>
          <input
            id="region"
            type="text"
            value={inputRegion}
            onChange={(e) => setInputRegion(e.target.value)}
            placeholder="Enter region/state"
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="country">Country: </label>
          <input
            id="country"
            type="text"
            value={inputCountry}
            onChange={(e) => setInputCountry(e.target.value)}
            placeholder="Enter country"
          />
        </div>
        
        <button type="submit">Get Weather</button>
      </form>
    </div>
  );
}

export default App;
