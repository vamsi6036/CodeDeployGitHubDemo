// It contains all the things needed to be routed.

const express = require("express");

const locationController = require("../Controller/location");// goes to the path given
const resturantController = require("../Controller/Resturant");// for resturant , Filter part
const mealtypeController = require("../Controller/mealtype");
const userController = require("../Controller/user");// for both signup and Login we go within this path.

const menuController = require("../Controller/menu"); // for menu part


const route = express.Router();// it allows route to take Riuter functionality

route.get('/location', locationController.getLocations);// goes to locationController
route.get('/resturant/:loc_id', resturantController.getResturantById);
route.get('/mealtype', mealtypeController.getMealtypeList);
route.post('/signup', userController.postSignUp);// Post method for taking user details and updating in the DB.
route.post('/login', userController.postLogin);// Post method for Login part using data of Signup part.
route.post('/filter', resturantController.postFilterResturant); // for filter/Resturant search page part --> all the details on resturantController
route.get('/resturants/:id', resturantController.getRestaurantsById1); // details of resturant by _id
route.get('/menu/:id', menuController.getMenuById); // details of menu by _id from menu DB Collection





module.exports = route; // return statement