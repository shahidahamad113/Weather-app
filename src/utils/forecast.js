const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=71808fc9b034431b844100036202811&q='+latitude+','+longitude;
    request({ url:url, json: true }, (error, response)=> {
        if(error)
            callback('Unable to connect weather services', undefined);
        else if(response.body.error)
            callback('Unable to find location, Try again?', undefined);
        else callback(undefined, response.body)
    })
}

module.exports = forecast;