const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const DBInitializer = require('./Initializers/DBInitializers');
const loanController = require('./controllers/loanController');

const app = express();
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//Initializers
DBInitializer();

//Importing controllers
app.use('/',loanController);


//Starting the Server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening at port ${port}`));