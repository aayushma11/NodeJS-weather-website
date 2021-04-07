const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWF5dS1zaG1hIiwiYSI6ImNrbHp3cmVtcjBuZjkyb21yaGp3cTd5ZGgifQ.EbbxTQnRGQDHQWeM6B9_BA&limit=1'
    request({url, json: true}, (error, {body}) => {
      if(error){
        callback('Unable to connect to the location Services', undefined)
      } else if (body.features.length == 0){
          callback('Unable to find location, try again with another search!!', undefined)
      } else {
        callback(undefined, {
           latitude: body.features[0].center[1],
           longitude: body.features[0].center[0],
           location: body.features[0].place_name
          //console.log('The latitude is '+ latitude +' and longitude is ' + longitude);
        })
      }
    })
  }
  module.exports = geocode