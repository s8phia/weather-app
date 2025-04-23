const express = require('express'); //imports express module into the project
const app = express(); //creates an instance of express - the server, "make a brand new web server object"
const cors = require('cors'); //cors() is a middleware function that tells your server to allow other domans to send requests (lets frontend talk to backend)
const axios = require('axios');



app.use(cors());
app.use(express.json()); //lets express automatially parse JSON data from incoming requests

app.get('/api/outfit', async (req, res) => {
    const {city} = req.query;
    const API_KEY = 'f8efa097dd2f4078b6125334252304'

    try{
        const weatherResponse = await axios.get('http://api.weatherapi.com/v1/current.json', {
            params: {
                key: API_KEY,
                q: city
            }
        });
    

        const weatherData = weatherResponse.data;
        const conditon = weatherData.current.condition.text.toLowerCase();
        const tempC = weatherData.current.temp_c;
        const tempF = weatherData.current.temp_f;
        
        let baseOutfit = {};
        if (tempC < 10){
            baseOutfit = {
                "top": "long sleeve shirt",
                "bottom": "pants",
                "outerwear": "jacket"
            }
        } else if (tempC < 20 && tempC >= 10){
            baseOutfit = {
                "top": "short sleeve shirt",
                "bottom": "pants",
                "outerwear": "light jacket"
            }
        } else {
            baseOutfit = {
                "top": "t-shirt",
                "bottom": "shorts",
            }
        }
        const snow_essentials = {
            "acessories": "hat, gloves, scarf",
            "footwear": "boots",
    }
        const rain_essentials = {
            "acessories": "umbrella"
        }
        const sun_essentials = {
            "acessories": "sunglasses"
        }
        if (condition.includes("snow")){
            baseOutfit = {...baseOutfit, ...snow_essentials};
        } else if (condition.includes("rain")){
            baseOutfit = {...baseOutfit, ...rain_essentials};
        } else if (condition.includes("sun")){
            baseOutfit = {...baseOutfit, ...sun_essentials};
        }
        res.json({
            city: weatherData.location.name,
            condition,
            temperature: {
                celsius: `${tempC}°C`,
                fahrenheit: `${tempF}°F`
            },
            outfit: baseOutfit
        });
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Error fetching weather data'});
    }
})
