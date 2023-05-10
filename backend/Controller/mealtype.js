const Mealtype = require('../Models/mealtype');
exports.getMealtypeList = (req, res) => {
    Mealtype.find()
        .then(response => {
            res.status(200).json({
                message: "Success",
                mealtypes: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}