const axios = require('axios');

// Function to fetch the location using Google Maps Geocoding API
const fetchLocation = async (query) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Ensure the API key is set in your environment variables
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}`;


    try {
    console.log(`Using API Key: ${apiKey}`);

        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            // Log the formatted address and coordinates
            const results = response.data.results;
            results.forEach(result => {
                console.log(`Address: ${result.formatted_address}`);
                console.log(`Coordinates: ${result.geometry.location.lat}, ${result.geometry.location.lng}`);
            });
        } else {
            console.error(`Error fetching location: ${response.data.status}`);
        }
    } catch (error) {
        console.error(`Error fetching location: ${error.message}`);
    }
};

// Fetch location for The Woodlands Methodist Church

fetchLocation('The Woodlands Methodist Church');
