//app.get("/api", (req, res) => {
    //return res.json({message: "This is from backend"});
//})

const express = require('express');
const cors = require('cors');
const axios = require('axios'); 
const app = express();
const port = 5000;
const API_KEY = 'f8efa097dd2f4078b6125334252304'; // yes, hide in .env later!

app.use(cors());
app.use(express.json());

// Weather route
app.get("/weather", async (req, res) => {
    const city = req.query.city || "Vancouver";
    const country = req.query.country || "Canada";
    const region = req.query.region || "British Columbia";

    try {
        const response = await axios.get('http://api.weatherapi.com/v1/current.json', {
            params: {
                key: API_KEY,
                q: `${city}${country ? ',' + country : ''}${region ? ',' + region : ''}`, 
                aqi: 'no'
            }
        });

        const data = response.data;
        res.json({
            region: data.location.region,
            country: data.location.country,
            city: data.location.name,
            temperature: `${data.current.temp_c}°C`,
            condition: data.current.condition.text,
            icon: data.current.condition.icon
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


