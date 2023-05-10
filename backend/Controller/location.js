//const Locations = require("../Models/location.json");// goes to data file in the path given
const Locations = require("../Models/location");
exports.getLocations = (req, res) =>{
    Locations.find({},{})
    .then(response => {
        res.status(200).json({message: "Locations fetched here", locations: response})
    }) 
    .catch(err => {
        res.status(500).json({ error: err })
    }) 
}
// added Locations.find({},{})
   //    .then() & instaead of Locations == response