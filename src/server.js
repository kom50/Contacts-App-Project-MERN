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
if (process.env.NODE_ENV === 'production') {
	// app.use(express.static('../client/build'));
	app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.get('/', (req, res) => {
// 	res.send('he');
// });

// add user routes
const usersRoutes = require('./routes/userRoutes.js');
app.use(usersRoutes);
// add contacts routes
const contactsRoutes = require('./routes/contactRoutes.js');
app.use(contactsRoutes);

const connect = require('./db/connectDB');
connect((database) => {
	app.listen(port, () => {
		console.log(`Server running at http://localhost:${port}`);
	});

	// app.locals
	app.locals.db = database;
});
