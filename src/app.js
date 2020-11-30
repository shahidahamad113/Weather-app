const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
  
const app = express();

const PORT = 3000 | process.env.PORT

// Define paths for express config
const viewPath = path.join(__dirname, '../template/views');
const partialPath = path.join(__dirname, '../template/partials');

// Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// Setup static directory to server
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        name: 'Shahid Afridi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        helpText: 'This is some helpful text',
        title: 'help page',
        name: 'Shahid Afridi',
        
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location}={}) => {
        if(error)
           return res.send({error});
        forecast(latitude,longitude, (error, forecastData) => {
            if(error)
                return res.send({error})
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/product', (req, res) => {
    if(!req.query.address)
        return res.send({error: 'You must provide an address'})
    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        name:"Shahid Afridi"
    })
})

app.listen(PORT, ()=> {
    console.log('Server is just started on')
})