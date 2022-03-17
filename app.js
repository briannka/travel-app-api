//Global object

cityData = {};
weatherData = {};

// Imported functions
const geonames = require('./geonames');
const fetch = require('node-fetch');

// Setup empty JS object to act as endpoint for all routes
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder

app.post("/city", (req, res) => {
  const searchedCity = req.body.city;
  cityData.city = searchedCity;
	geonames
    .getCity(searchedCity)
    .then( (result) => {
      res.send(JSON.stringify(result));
    })
    .catch(err => {
      const response = null;
      res.status(404).send(JSON.stringify(response));
    });
});

app.post("/weather", (req, res) => {
  const lat = req.body.lat;
  const lon = req.body.lon;
  weatherData.lat = lat;
  weatherData.lon = lon;
  const secretKey = 'a53b81b6e6aaa6c4367dfe55c5001474';
  const url = `https://api.darksky.net/forecast/${secretKey}/${lat},${lon}`;
  fetch(url)
  .then(res => res.json())
  .then(data => {
      res.send({ data });
  })
  .catch(err => {
      res.send(err);
  });
})

const port = 8080;
app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});

module.exports = app;
