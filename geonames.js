const Geonames = require("geonames.js");

const getCity = (input) => {
    const geonames = new Geonames({
      username: 'briannka',
      lan: 'en',
      encoding: 'JSON'
    });
    return geonames.search({q: 'CITY', name: input})
    .then(res => {
        // const results = parseCities(res.geonames);
        const country = res.geonames[0].countryName;
        const lon = res.geonames[0].lng;
        const lat = res.geonames[0].lat;
        console.log(res.geonames[0]);
        console.log('Country is ' + res.geonames[0].countryName);
        console.log('Longitude is ' + res.geonames[0].lng);
        console.log('Latitude is '+ res.geonames[0].lat);
        return {
            country: country, 
            lon: lon,
            lat: lat
        };
    })
    // .catch(err => console.error('err:', err));
}

module.exports = { getCity }
