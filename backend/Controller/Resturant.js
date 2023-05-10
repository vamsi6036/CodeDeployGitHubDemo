
const Resturant = require('../Models/Resturant');

exports.getRestaurantsById1 = (req, res) => {   //---> for search details by id
    const { id } = req.params;
    Resturant.findById(id) // -->return Object
   //Resturant.find({_id : id},{})  //-->return Array
    .then(response => {
        res.status(200).json({
            message: "Restaurant Fetched by id Successfully",
            resturant: response 
        })
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
},

exports.getResturantById = (req,res)=>{    //---> for resturant part by city
    const {loc_id} = req.params;
    //const filterdOutput = Resturant.filter(item => item.city_name == city); --> this is for data from normal way
    Resturant.find({ city : loc_id},{})
      .then(response => {
           res.status(200).json({
        message: "Resturant data fetched successfully",
        resturant : response 
    })
})
.catch(err => {
    res.status(500).json({ error: err })
})   
},

exports.postFilterResturant =(req,res)=>{   //-->for Filter Part
var{ mealtype, location, cuisine, hcost, lcost, sort, page} = req.body; // Things as part of filter section

    sort = sort ? sort : 1;     // 1 -> Ascending Order, -1 -> Decending Order & // by default if no sort is selected then orginal will be there.
    page = page ? page : 1;     // Starting from page number 1

    const itemsPerPage = 2;     // Number of restaurant details per page
    let startIndex = page * itemsPerPage - itemsPerPage; // starting index
    let endIndex = page * itemsPerPage; // ending index

let filterObj = {};

mealtype && (filterObj["type.mealtype"] = mealtype); // 1. filterObj finds the match for mealtype in type.mealtype and saves the data in it.
location && (filterObj["city"] = location); //2. finds for location part
// 3. Cusine part (previously we given [cusine], so here we can only read for 1 value.)
// we will be given only cusine--> so that it will automatically takes values into arrays[]. as it naturally accepts multi values.n
cuisine && cuisine.length>0 && (filterObj["Cuisine.cuisine"] = { $in: cuisine });
// -->cost Filter. here $gte--Greater than equal to, $lte are default functionalities of Mongodb
lcost && hcost && (filterObj["cost"] = {$gte: lcost, $lte: hcost});
                               
console.log(filterObj); // see the data that it found.

Resturant.find(filterObj).sort({ cost: sort }) // checks for above response existence & // we added '.sort' = sorting data based on cost.
.then(response =>
    {
        const filteredResponse = response.slice(startIndex, endIndex); // ---> pagination : data per page

        res.status(200).json({
            message: "Resturant fetched successfully",
            resturants : filteredResponse
        })
    }) 
    .catch(err => {
        res.status(500).json({ error: err })
    })
}