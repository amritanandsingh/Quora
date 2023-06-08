const moongoose = require('mongoose');

moongoose.connect('mongodb://localhost/quora_development');
const db = moongoose.connection ; 
db.on('error',console.error.bind(console, "error in connecting to mongoDB"));

db.once('open' , function(){
    console.log('connected to DB quora_development');
});

module.exports = db;