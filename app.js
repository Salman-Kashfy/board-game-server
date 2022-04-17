const express = require('express');
require('dotenv').config({path:'./.env'})
const bodyParser = require("body-parser");
const app = express();
var cors = require('cors')

/*
* Initialize Body parser
* */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB Connection
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to Mongo");
}).catch(error => {
    console.log("Something wrong happened", error);
});

/*
* CORS Requests
* */
const allowedOrigins = [process.env.CLIENT_ORIGIN];
app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

/*
* Application Routes
* */
const router = require('./router')
app.use('/api', ...router)

/*
* 404 Route
* */
app.use((req, res) => {
    const error = new Error("Not found");
    error.status = 404;
    res.status(404).json({status:false,message:'Oops. Page not found!'})
});

module.exports = app