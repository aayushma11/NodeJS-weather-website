const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b1b15e88fa797225412429c1c50c122a1?' + latitude + ',' + longitude
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to the Weather Services', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.list[0].main.temp + ' degree and ' + body.list[0].weather[0].description)
        }
    })
}

module.exports = forecast