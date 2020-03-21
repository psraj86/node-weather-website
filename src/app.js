const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

const PORT = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname,'../templates/partials')

app.set('views', viewsPath);
app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialPath);

app.get('', (req, res) => { 
    res.render('index', {
        title : 'Weather App',
        name : 'Praveen Singh'
    });
});

app.get('/weather', (req, res) => { 
    if (!req.query.address) {
        return res.send({
            'error':'No address'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({error});
        }
        console.log(latitude)
        console.log(longitude)
        console.log(req.query.address)

        forecast(latitude, longitude, (error,forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })
    });
});

app.get('/about', (req, res) => { 
    res.render('about', {
        title: 'About Me',
        name:'Praveen Singh'
    })
});
app.get('/help', (req,res) => { 
    res.render('help', {
        title: 'Help App',
        name: 'Praveen Singh'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Praveen Singh',
        errorMessage:'Page Not found.'
    })
});

app.listen(PORT, () => { 
    console.log("Server is running on : http://localhost:"+PORT);
})