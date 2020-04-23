const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express Cconfig
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views/')
const partialsPath = path.join(__dirname, '../templates/partials/')

// Setup Handebars Engine and Views Location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set Express default/statis directory
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bob'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bob'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name:   'Bob'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, {longitude,latitude,location} = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
//        const { description, temperature, feelslike } = forecastData
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

/*
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    console.log(req.query.search)
    res.send({
        products: []
    })
})
*/

// 404 Page to catch just help/
app.get('/help/*', (req, res) => {
    res.render ('404', {
        title:          'Help 404',
        name:           'Bob',
        errorMessage:   'Help article not found'
    })
})

// 404 Page to catch all
app.get('*', (req, res) => {
    res.render ('404', {
        title:          '404',
        name:           'Bob',
        errorMessage:   'Page not found'
    })
})

// Start server listening
app.listen(port, () => {
    console.log('server is up on port ' + port)
})
