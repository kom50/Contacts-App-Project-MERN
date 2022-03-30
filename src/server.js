const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// for credential  data
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Home page
// app.use('/', (req, res)=>{
// 	res.json({msg: 'Welcome to our API'})
// })
//


// add user routes
const usersRoutes = require('./routes/userRoutes.js');
app.use(usersRoutes);
// add contacts routes
const contactsRoutes = require('./routes/contactRoutes.js');
app.use(contactsRoutes);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
	//
	app.use('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build/index.html'))
	})
	// disable logs in production
	console.log = () => { }

}

const connect = require('./db/connectDB');
connect((database) => {
	app.listen(port, () => {
		console.log(`Server running at http://localhost:${port}`);
	});

	// app.locals
	app.locals.db = database;
});
