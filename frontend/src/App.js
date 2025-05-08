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
  const chillyBase= ["Long pants", " longsleeve shirt", "Thin Jacket", "Sneakers"];
  const somewhatColdBase = ["Long pants", " t-shirt", " Sneakers"];
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
      outfit = [...somewhatColdBase];
    } else if (temp >= 5) {
      outfit = [...chillyBase];
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
    <div className="bg-frontPage min-h-screen relative flex items-center justify-center">
      <img
        src="/images/weartherTitle.png"
        alt="Weather Title"
        className="absolute top-2 left-1/2 transform -translate-x-1/2 w-50 h-auto z-10 mt-[-20px]"
      />

      

      <div className="flex flex-col items-center z-10 relative p-6">
        {showWeather ? (
          <div className="bg-white text-center p-6 rounded shadow-md">
            <h1>{weather.city}, {weather.region}, {weather.country}</h1>
            <h2>{weather.temperature}</h2>
            <h3>{weather.condition}</h3>
            <h4 className="font-bold mt-4">Suggested Outfit:</h4>
            <ul className="list-disc list-inside">
              {suggestOutfit(weather.temperature, weather.condition).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button onClick={() => setShowWeather(false)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Back
            </button>
          </div>
        ) : (
        <div
          style={{
            backgroundImage: 'url("/images/rectangle1.png")',
            backgroundSize: 'contain',        
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '500px',                   
            height: '450px',                           
          }}
          className="flex flex-col items-center justify-center"
        >

          <form id = "weatherform"className="flex flex-col align-items" onSubmit={handleSubmit}>
            <div className= "">
              <img src="/images/City.png" alt = "City" className = "mb-3"/>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder=""
                className="bg-transparent pl-4 pr-4 py-2 w-[200px] h-[60px] border-none outline-none text-black text-lg"
                style={{
                  backgroundImage: 'url("/images/textbox 1.png")',
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />  
            </div>
            <div>
              <img src = "/images/Region.png" alt = "Region" className = "mb-3"/>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder=""
                className="bg-transparent pl-4 pr-4 py-2 w-[200px] h-[60px] border-none outline-none text-black text-lg"
                style={{
                  backgroundImage: 'url("/images/textbox 1.png")',
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </div>
            <div>
              <img src = "/images/Country.png" alt = "Country" className = ""/>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder=""
                className="bg-transparent pl-4 pr-4 py-2 w-[200px] h-[60px] border-none outline-none text-black text-lg"
                style={{
                  backgroundImage: 'url("/images/textbox 1.png")',
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </div>
          </form>
          </div>
        )}
      </div>
      <div>
      {!showWeather && (
        <input
          type="image"
          src="/images/READY.png"
          alt="Submit"
          form="weatherform"
          className="mt-6 w-[200px] h-auto"
        />
      )}
      </div>
    </div>
  );
  
  
}

export default App;
