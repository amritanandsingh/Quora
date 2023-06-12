const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');    // for layouts
const cookieParser = require('cookie-parser');


const port = 3000;
const db = require('./config/mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');  //each time when server restart the cookies removed from server, to solved use this approch.

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');



app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./assets'));       // set style for layout , header , footer 
app.use(expressLayouts);                 // to merge headerfooter and display in layout.ejs
app.set('layout extractStyles',true);   // to set style link in top of layout.ejs 
app.set('layout extractScripts',true); // to set script link in top of layout.ejs
app.set('view engine','ejs'); 
app.set('views','./views');     



app.use(session({                
    name: 'Quora',
    secret: 'amrit',
    saveUninitialized: false, 
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 20 // 20 minutes
    },
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost/quora_development",
        autoRemove: 'disabled'  
    }),
    // Error handling callback
    errorHandler: function(err) {
        console.log(err || 'Connected to MongoDB for session storage');
    }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
    //console.log(req.user);
    res.locals.user = req.user;
    next();
});

app.use('/',require('./routes'));                   

app.listen(port , function(err){
    
    if(err)
    {
        console.log(`server is facing error: ${err}`);
    }
    console.log(`server is up and running ${port}` );
});  
 
