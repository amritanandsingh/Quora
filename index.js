const express = require('express');
const app = express();

const port = 3000;

app.listen(port , function(err){
    if(err)
    {
        console.log(`server is facing error: ${err}`);
    }
    console.log("server is up and running ");
});  
 