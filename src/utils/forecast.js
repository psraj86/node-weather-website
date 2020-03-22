const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/8c2e14db90d50ce3bfc5dbfb4af680c5/${latitude},${longitude}`;
    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect the Weather app!')
        } else if (body.error) {
            callback('Unable to find the location')
        } else {
            console.log(body.daily);
            callback(undefined, `${body.currently.summary}. It is currently ${body.currently.temperature} degrees out. This high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}. There is ${body.currently.precipProbability}% chance of rain.`);
        }
    });
}

module.exports = forecast;