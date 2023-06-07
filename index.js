const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');    // for layouts
const port = 3000;
app.use(express.static('./assets'));       // set style for layout , header , footer 
app.use(expressLayouts);                 // to merge headerfooter and display in layout.ejs
app.set('layout extractStyles',true);   // to set style link in top of layout.ejs 
app.set('layout extractScripts',true); // to set script link in top of layout.ejs
app.use('/',require('./routes'));                   
app.set('view engine','ejs'); 
app.set('views','./views');     


app.listen(port , function(err){
    
    if(err)
    {
        console.log(`server is facing error: ${err}`);
    }
    console.log(`server is up and running ${port}` );
});  
 
