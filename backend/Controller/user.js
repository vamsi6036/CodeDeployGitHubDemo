const User = require('../Models/user');

exports.postSignUp = (req, res) => { // signUp part data 
    const { email, password, name} = req.body; // here we are giving data on the body part.
    
    const userObj = new User ({ // for every new entry we need to create new user
        email, password,name

    });

    userObj.save()    // we need to save after user entry
       .then(response =>
        {
            res.status(200).json({
                message: "User details fetched successfully",
                SignUp : response
            })
        }) 
        .catch(err => {
            res.status(500).json({ error: err })
        })

}
exports.postLogin = (req, res) => { // Login part data based on User
    const { email, password } = req.body;

    User.find({ // it looks for both email , password
        email, 
        password
    })

    .then(response => {
        if(response.length > 0){
            res.status(200).json({
                message: "User Details are Verified",
                isAuthenticated: true, // if Login is true, then it will not ask further to login.<-->(React part for exact functionality)
                login: response
            })
        }else{ // if there is no proper response we run else part
            res.status(200).json({
                message: "User Details are not Verified",
                isAuthenticated: false, // if Login is Failed, then it will ask again to login
                login: response
            })
        }
        
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
}