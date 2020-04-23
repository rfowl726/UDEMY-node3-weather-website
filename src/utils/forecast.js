/****************
 * Darksky/Weatherstack data
 ****************/
const request = require('request')
var url

const forecast = (long, lat, callback) => {
    url ='http://api.weatherstack.com/current?access_key=04ee1a9d94e0c002aed5ced1d0a72d33&query=' + lat + ',' + long + '&units=f'
//    request({ url: url, json: true }, (error, response) => {
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('ERROR (forecast): ' + error, undefined)
        } if (body.error) {
            callback ('Unable to find location ',body.error, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions + ' - It is currently ' + body.current.temperature + ' degrees outside. Feels like ' + body.current.feelslike)
        }   
    })
}    

module.exports = forecast