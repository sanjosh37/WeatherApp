const request = require ('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dac176139ed23955660d847b10e4d376&query='+lat+','+long

    request ({url:url, json:true}, (error, response)=> {
        if (error) {
            callback ('Unable to connect to weatherstack!', undefined)
        } else if (response.body.error) {
            callback ('Unable to get the weather info!', undefined)
        } else {
            const data = {
                desc: response.body.current.weather_descriptions[0],
                temp: response.body.current.temperature,
                feeltemp: response.body.current.feelslike 
            }
            callback (undefined, data)
        }
    })
}

// Below req for Error:
// const url = 'http://api.weatherstack.com/current?access_key=dac176139ed23955660d847b10e4d376&query='
// const longlaturl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/12what.json?access_token=pk.eyJ1Ijoic2Fuam9zaDM3IiwiYSI6ImNrOTZ0d3J0aTBibGUzZnJzYnRtc3ZwZHQifQ.n511jh_lcfJxj98jKmC2Qg'


// request({ url: url, json: true }, (error, response)=> {
//     //const data = JSON.parse (response.body)
//     //console.log (response.body.current)
//     //const temparature = response.body.current.temparature;
//     //const feelsliketmp = response.body.current.feelsliketmp;
//     if (error) {
//         console.log ('Error: unable to connect the weather app url')
//     } else if (response.body.error) {
//         console.log ('Error: Unable to get the weather info!')
//     } else {
//         const msg = response.body.current.weather_descriptions[0]
//         console.log ('Weather: ' + msg + '. It is currently ' + response.body.current.temperature +" degrees out. It feels like " +
//         response.body.current.feelslike +" degrees ")
//     }
// })

module.exports = forecast