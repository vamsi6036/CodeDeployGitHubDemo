const Menu = require("../Models/menu");

exports.getMenuById = (req, res) => {   //---> for menu search details by id from menu Collection Db
    const { id } = req.params;
    //Menu.findById(id)
    Menu.find({ restaurantId : id},{}) 
    .then(response => {
        res.status(200).json({
            message: "Menu details Fetched by id Successfully",
            Menu: response
        })
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
}
