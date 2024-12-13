require('dotenv').config();
const axios = require('axios');

const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

// Function to get GPS coordinates from Google Maps API
async function getCoordinatesFromGoogle(placeName) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(placeName)}&key=${googleMapsApiKey}`;
    const response = await axios.get(url);
    
    if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { lat, lng, source: 'Google Maps' };
    }
    return null;
}

// Function to get GPS coordinates from OpenStreetMap (Nominatim API)
async function getCoordinatesFromOSM(placeName) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName)}&format=json`;
    const response = await axios.get(url);
    
    if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat, lng: lon, source: 'OpenStreetMap' };
    }
    return null;
}

// Main function to find coordinates from multiple sources
async function findCoordinates(placeName) {
    const googleCoords = await getCoordinatesFromGoogle(placeName);
    const osmCoords = await getCoordinatesFromOSM(placeName);
    
    const results = [googleCoords, osmCoords].filter(coord => coord !== null);

    // Cross-reference results and choose the most accurate one if available
    if (results.length > 0) {
        console.log(`Coordinates for "${placeName}":`);
        results.forEach(result => {
            console.log(`Source: ${result.source}, Latitude: ${result.lat}, Longitude: ${result.lng}`);
        });
    } else {
        console.log(`No coordinates found for "${placeName}".`);
    }
}

// Example usage
const placeName = 'The Woodlands Methodist Church';
findCoordinates(placeName);
