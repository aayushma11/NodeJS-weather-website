const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// 　console.log(__dirname)
//  console.log(path.join(__dirname, '../public'))

const app = express()
//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup Static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aayushma',
        message: 'This is an index page!!'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Aayushma',
        message: 'Always be Grateful and believe in magic!!'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Aayushma'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
       return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({
                error: 'Unable to find location. Try another search!'
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
             if(error) {
                 return res.send({ error })
             }
             res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
             })
        })
    })
})
app.get('/products', (req, res) => {
    if(!req.query.search) {
       return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.found);
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found!'
    })
})
//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})