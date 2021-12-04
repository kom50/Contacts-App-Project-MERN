const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');

// database
let db;

router.use((req, res, next) => {
	console.log('Hello from users route');
	db = req.app.locals.db;
	next();
});

//  endpoint /users
/*  methods 
     GET        find all users
	 POST       add new user
 */
router
	.route('/api/users')
	.all((req, res, next) => {
		console.log('all');
		next();
	})
	.get(async (req, res) => {
		console.log('get');
		const result = await db.collection('users').find({}).toArray();
		if (result) {
			for (let key in result) {
				delete result[key]._id;
			}
			res.status(200).json([...result]);
		} else {
			res.status(404).json({ err_msg: 'data not available' });
		}
	})
	.post(async (req, res) => {
		console.log('post data', req.body);
		const data = { ...req.body };

		let result = await db
			.collection('users')
			.findOne({ username: req.body.username });
		console.log(result, !result);
		if (!result) {
			result = await db.collection('users').insertOne(data);
			res.status(201).json({
				msg: 'Account created successful',
				...data,
			});
		} else {
			res.status(403).json({ err_msg: 'Not Allowed' });
		}
	});

//   /users/:name     // users?name=om
/*  methods 
     GET        -> find single user by name
	 PUT		-> update user document by name 
	 DELETE      -> delete a user by name
 */
router
	.route('/api/users/:username')
	.all((req, res, next) => {
		console.log('req');
		next();
	})
	.get(async (req, res) => {
		console.log('get', req.params.username);
		const result = await db
			.collection('users')
			.findOne({ username: req.params.username });
		console.log(result);
		if (result) {
			delete result._id; //
			res.status(200).json({ ...result });
		} else {
			res.status(404).json({ msg: 'data not available' });
		}
	})
	.put((req, res) => {
		console.log('put');
		res.send('update user by name');
	})
	.delete(async (req, res) => {
		console.log('delete');
		const result = await db
			.collection('users')
			.deleteOne({ username: req.params.username });
		if (result) {
			delete result._id; //
			res.status(200).json({ msg: 'user deleted ', ...result });
		} else {
			res.status(404).json({ msg: 'data not available' });
		}
	});

module.exports = router;
