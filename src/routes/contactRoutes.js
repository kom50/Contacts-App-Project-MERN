const express = require('express');

const router = express.Router();

// database
let db;
let username;
router.use((req, res, next) => {
	console.log('Hello from contacts route');
	db = req.app.locals.db;
	username = req.query.username;

	console.log('req.query ', req.query);
	next();
});

//  endpoint /contacts
/*  methods 
     GET        find all users
	 POST       add new user
 */

// api/contacts/?username=hello
router
	.route('/api/contacts')
	.all((req, res, next) => {
		console.log('contacts api');
		next();
	})
	.get(async (req, res) => {
		console.log('get', req.query);
		// res.send('Get contacts data');

		const result = await db
			.collection(`contacts_${username}`)
			.find({})
			.toArray();
		console.log(result);
		for (let key in result) {
			delete result[key]._id;
		}

		res.send(result);
	})
	.post(async (req, res) => {
		console.log('post', req.body);

		const { ...data } = req.body;
		console.log('username', username);
		console.log('data', data);
		const result = await db
			.collection(`contacts_${username}`)
			.insertOne(data);
		res.status(201).json({
			msg: 'Contacts added',
		});
		console.log(result);
		// res.status(403).json({ err_msg: 'Not Allowed' });
		// res.end();
	});

//   /contacts/:id     // contacts?id=101
/*  methods 
     GET        -> find single contact by id
	 PUT		-> update contact document by id 
	 DELETE      -> delete a contact by id
 */
let first_name;
router
	.route('/api/contacts/:first_name')
	.all((req, res, next) => {
		console.log('contacts api first_name');
		first_name = req.params.first_name;
		username = req.query.username;
		next();
	})
	.get(async (req, res) => {
		console.log('get params ', req.params);
		console.log('get query ', req.query);

		const result = await db
			.collection(`contacts_${username}`)
			.find({ first_name: req.params.first_name })
			.toArray();
		console.log(result);
		if (!result || !result.length) {
			res.json({ msg: 'Contacts list not found' });
		} else {
			for (let key in result) {
				delete result[key]._id;
			}
			res.json(result);
		}
	})
	.put(async (req, res) => {
		console.log('put ', req.body);
		console.log('put ', req.params);
		console.log('put ', req.query);

		const result = await db
			.collection(`contacts_${username}`)
			.updateOne({ first_name: first_name }, { $set: { ...req.body } });
		console.log(result);
		if (!result.modifiedCount) {
			res.status(404).json({ msg: 'Contacts details not found' });
		} else {
			res.json({ msg: 'Contacts updated' });
		}
		// res.end();
	})
	.patch(async (req, res) => {
		console.log('patch ', req.body);

		const result = await db
			.collection(`contacts_${username}`)
			.updateOne({ first_name: first_name }, { $set: { ...req.body } });
		console.log(result);
		if (!result.modifiedCount) {
			res.status(404).json({ msg: 'Contacts details not found' });
		} else {
			res.json({ msg: 'Contacts updated' });
		}
		// res.end();
	})
	.delete(async (req, res) => {
		console.log('delete');
		const result = await db
			.collection(`contacts_${username}`)
			.deleteOne({ first_name: first_name });
		console.log(result);
		if (!result.deletedCount) {
			res.status(404).json({ msg: 'Contacts not found' });
		} else {
			res.json({ msg: 'Contacts deleted' });
		}
		res.end();
	});

module.exports = router;
