//importing express
var express = require ('express');
const mongoose = require('mongoose'); // importing mongoose from mongo DB
// importing CorsOptions from Cors package -- it helps in connecting Backend DB to React.
const cors = require('cors');
const route = require("./Routes/index");
const dotenv = require('dotenv'); // pkg that maintains and look over created .env("environmental file", that will help us to keep the data in usage on needs.
const passport = require ('passport');
const cookieSession =  require ('cookie-session');

const paymentRoutes = require('./Controller/payment');
const authRoute = require("./Controller/auth");
const passportSetup = require("./Controller/passport");

dotenv.config();

const Port = process.env.PORT || 4080;// starts processing the file and flow with the port
const hostname = 'localhost';
 //const dbUrl  = 'mongodb://127.0.0.1:27017/vamsi'; //-- Importing the MongoDB server URL
const atlasDburl = 'mongodb+srv://Mullapudi6036:JwromAA9vJgB6aF7@cluster0.obkvxep.mongodb.net/zomato?retryWrites=true&w=majority'; // Atlas url importing instead of Mongodb url

const CorsOptions = {
   origin:'http://localhost:3000', // connecting path of react. * React always work on 3000 Port No. *
   credentials:true,
  optionSuccessStatus: 200
}

const app = express();
// use CorsOption only after express usage.
app.use(cookieSession({ name: "session", keys:["edureka"], maxAge:24*60*60*1000 })); // Gooogle allows cookies for certain period of time only.
    // 24 hours * 60 minutes * 60 Seconds * 1000 MilliSeconds = 84600000 milli seconds a day
    
app.use(cors(CorsOptions));
app.use(express.json());
// passport .use related part
app.use(passport.initialize());
app.use(passport.session());
app.use('/',route);
app.use("/api/payments/", paymentRoutes);
app.use("/auth", authRoute);

mongoose.connect(atlasDburl, {
    useNewUrlParser: true, useUnifiedTopology: true // Creating a new connection with DB using Mongodb driver's connection management engine.
}) // ...?
  .then(res =>{
    app.listen(Port, hostname, () => {
        console.log(`server is at ${hostname}:${Port}`)
    });
    })
//app.listen(Port, hostname, () => {
  //  console.log(`server is at ${hostname}:${Port}`)
//}); // why string template...? Inorder to fetch the values inside the log.