const request = require("request")

const openWeather = (latitude, longitude, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=dab904a5e46e588fcb95e92e989b2b4e`

    request({ url, json: true }, (err, res) => {
        if (err) {
            callback("Unable to connect to service", undefined);
        }
        else if (res.body.message) {
            callback(res.body.message, undefined);
        }
        else {
            callback(undefined,
                `Weather is ${res.body.weather[0].main} (${res.body.weather[0].description}) \n Temperature: ${((res.body.main.temp-273)).toFixed(2)} Centigrade`)
        }
    }
    )
}

module.exports = openWeather