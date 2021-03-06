const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const mongoose = require('./db')
//let config = require('./config/enviroment')



// Se indica el directorio donde se almacenarán las plantillas 
app.set('views', './views');

// Se indica el motor del plantillas a utilizar
app.set('view engine', 'html');

app.use('/', require('./routes/website'))

app.use('/public',express.static('public'));



app.listen(3000, () => {
    console.log("The server started at port ", 3000);
});