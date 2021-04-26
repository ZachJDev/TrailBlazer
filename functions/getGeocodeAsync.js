const GoogleMapsAPI = require('googlemaps')
const mapsConfig = require('../configs/GoogleMapsConfig').publicConfig
const gmAPI = new GoogleMapsAPI(mapsConfig)

module.exports = function getGeocodeAsync(params) {
    return new Promise((resolve, reject) =>  {
        gmAPI.geocode(params, (err, data) => {
            if(err !== null) reject(err);
            else resolve(data);
        })
    })
}