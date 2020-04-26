const path = require ('path')
const express = require('express')
const hbs = require ('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log (__dirname)
// console.log (path.join(__dirname, '../public'))
const app = express()



const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join (__dirname, '../templates/views')
const partialPath = path.join (__dirname, '../templates/partials')

app.set ('view engine', 'hbs')
app.set ('views', viewPath)
hbs.registerPartials(partialPath)

app.use (express.static(publicDirPath))

app.get ('', (req, res)=>{
    res.render ('index', {
        title: 'weather app',
        name: 'Santosh Joshi'
    })
})
app.get ('/help', (req,resp)=>{
    resp.render ('help', {
        title: 'Help page',
        name: 'Santosh Joshi',
        helpText: 'This is a help page!'
    })

})
app.get ('/about', (req,resp)=>{
     resp.render ('about', {
         title: 'someInfo',
         name: 'Santosh Joshi'
     }) 
})

// })
app.get ('/weather', (req,res)=>{
    if (!req.query.address) {
        return res.send ({
            Error: 'address is mandatory for this request'
        })
    }
    const addr = req.query.address
    geocode (addr, (error, data)=>{
        if (error) {
            console.log ('Error:' + error)
            return res.send ({
                Error: error
            })
        } else {
            //console.log (data)
            const place = data.place
            forecast(data.latitude, data.longitude, (error, weather) => {
                if (error) {
                    return res.send ({
                        Error: error
                    })
                } else {
                    console.log (weather)
                    const temp = weather.temp
                    return res.send ({
                        forecast: weather.desc, 
                        temperature: weather.temp,
                        address: place
                    })
                }
            })
        }
    })
    
    //console.log (req.query)
    // res.send ({
    //     forecast: 'It is raining', 
    //     location: 'Bengaluru',
    //     address: req.query.address
    // })

})

app.get ('/help/*', (req,res)=> {
    res.render('404', {
        title: 'Help Error',
        errorMsg: 'Help Article not found',
        name: 'Viraaj Joshi'
    })
})

app.get ('*', (req,res)=> {
    res.render('404', {
        title: 'Page Not Found',
        name: 'Samarth Joshi',
        errorMsg: 'Page couldnt be found'
    })
})
const port = 4000
app.listen(port, ()=>{
    console.log ('Server is up on port: ' + port)
})
