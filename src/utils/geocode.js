/******************************************
 * Geocoding
 *      Address -> Lat/Long -> Weather
 *      https://www.mapbox.com/
 * 
 * "geometry": { 
 *      "type": "Point",
 *      "coordinates": [
 *          -118.2439,
 *          34.0544 ]
 *****************************************/
const request = require('request')
var url

const geocode = (address, callback) => {
    url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYm9iaWZtZCIsImEiOiJjazk4dmsyNWwxbGlpM2lteTJodjFocHdjIn0.MdL7P-ZF_FXasPeyq3E7DA&limit=1"
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('ERROR (mapbox): ' + error, null)
        } if (body.features.length === 0) {
                callback('ERROR: no coordinates found for ' + body.query, undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        } 
    })
}

module.exports = geocode