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
  const [showWeather, setShowWeather] = useState(false); //show-hide form
  
  const winterBase = ["Long pants", " Puffer Jacket", " Winter boots", " Gloves"];
  const chillyBase= ["Long pants", " longsleeve shirt", " Thin Jacket", " Sneakers"];
  const somewhatColdBase = ["Long pants", " longsleeve shirt", " Sneakers"];
  const warmWeatherBase = ["Shorts", " T-shirt", " Sneakers"];

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

    setShowWeather(true);
  };

  const handleback = (e) => {
    e.preventDefault();
    setShowWeather(false);
  }

  const bringUmbrella = (condition) => {
    if (!condition) return false;
    return condition.toLowerCase().includes("rain") || condition.toLowerCase().includes("drizzle");
  }

  const bringSunglasses = (condition) => {
    if (!condition) return false;
    return condition.toLowerCase().includes("sun") || condition.toLowerCase().includes("clear");
  }
  const wearGlovesAndScarf = (temperature, condition) => {
    if (temperature < 10 || (condition && condition.toLowerCase().includes('snow'))) {
      return true;
    }
    return false;
  };

  const wearHat = (temperature, condition) => {
    if (temperature < 0 || (condition && condition.toLowerCase().includes('snow'))) {
      return true;
    }
    return false;
  };

  const suggestOutfit = (temperature, condition) => {
    const temp = parseFloat(temperature);
    let outfit = [];

    if (temp >= 17) {
      outfit = [...warmWeatherBase];
    } else if (temp >= 11) {
      outfit = [...chillyBase];
    } else if (temp >= 5) {
      outfit = [...somewhatColdBase];
    } else {
      outfit = [...winterBase];
    }
    

    if (bringUmbrella(condition)) {
      outfit.push("Umbrella");
    }
    if (bringSunglasses(condition)) {
      outfit.push("Sunglasses");
    }
    if (wearGlovesAndScarf(temperature, condition)) {
      outfit.push("Gloves", "Scarf");
    }
    if (wearHat(temperature, condition)) {
      outfit.push("Hat");
    }

    return outfit;
  };

  return (
    <div className = "bg-frontPage min-h-screen flex flex-col items-center justify-center">
      {showWeather ? (
        // This is shown when showWeather is true
        <div>
          <h1>{weather.city}, {weather.region}, {weather.country}</h1>
          <h2>{weather.temperature}</h2>
          <h3>{weather.condition}</h3>
          <h4>{suggestOutfit(weather.temperature, weather.condition)}</h4>
          <button onClick = {() => setShowWeather(false)}>Back</button>
        </div>
      ) : (
        // This is shown when showWeather is false (form view)
        <form onSubmit = {handleSubmit}>
          <div>
            <label htmlFor = "city">City:</label>
            <input
              className="bg-transparent"
              type ="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder='Enter city'
              />
          </div>
          <div>
            <label htmlFor = "region">Region:</label>
            <input
              className="bg-transparent"
              type ="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder='Enter region'
              />
          </div>
          <div>
            <label htmlFor = "country">Country:</label>
            <input
              className='bg-transparent'
              type ="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder='Enter country'
              />
          </div>
          <button type = "submit">Get Weather</button>
        </form>
      )}
    </div>
  );
  
}

export default App;
