const request = require('request')

const geocode = (address, callback) => {
    const llurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1Ijoic2Fuam9zaDM3IiwiYSI6ImNrOTZ0d3J0aTBibGUzZnJzYnRtc3ZwZHQifQ.n511jh_lcfJxj98jKmC2Qg'
    
    request({uri: llurl, json: true}, (error, response)=>{
        if (error){
            callback ('Unable to connect to mapbox', undefined)
        } else if (response.body.features.length === 0) {
            callback('Couldnt get the latitude and longitude', undefined)
        } else {
            const data = {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                place : response.body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

// request({ url: longlaturl, json:true }, (error, response)=> {
//     //console.log (response.body.features)
//     //const data = JSON.parse (response.body)
//     //console.log(data)
//     if (error) {
//         console.log ('Error: Unable to connect to LL url.')
//     } else if (response.body.features.length === 0) {
//         console.log ('Error: Unable to get the Longitude and Latitude info.')
//     } else {
//         console.log ('Longitude: ' + response.body.features[0].center[1])
//         console.log ('Latitude: ' + response.body.features[0].center[0])
//     }
// })

module.exports = geocode