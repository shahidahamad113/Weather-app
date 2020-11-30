const request = require('request');

const geocode = ( address, callback ) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hhaGlkMTEzIiwiYSI6ImNraTFvYng2azB3OXMyc3FrOGhkbXM4M3IifQ.OS4qcxkAywTRXDrpVime7A'; 
    request({ url: url, json: true}, (error, response) => {
        if(error)
            callback('Unable to connect to location services', undefined)
        else if(response.body.features.length === 0)
            callback('Unable to find location, Try again', undefined)
        else callback(undefined, {
            latitude : response.body.features[0].center[1],
            longitude : response.body.features[0].center[0],
            location: response.body.features[0].place_name
        })
    })
};

module.exports = geocode;