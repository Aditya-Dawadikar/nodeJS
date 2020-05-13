const express = require('express');
const bodyParser= require('body-parser');

//const express app
const app = express();

//parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))


//parse request of content-type - application/json
app.use(bodyParser.json())

//configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//connecting to database
mongoose.connect(dbConfig.url,{
	useNewUrlParser:true
}).then(()=>{
	console.log("successfully connected to database");
}).catch(err=>{
	console.log('could not connect to database!.. Exiting now',err);
	process.exit();
});

//define a simple route
app.get('/',(req,res)=>{
	res.json({"message":"welcome to notes app"});
});

//require notes route
require('./app/routes/note.routes.js')(app);

app.listen(3000,()=>{
	console.log("server is starter on port 3000");
});




















