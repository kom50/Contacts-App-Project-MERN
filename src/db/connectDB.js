var MongoClient = require('mongodb').MongoClient;

function connect(callback) {
	MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
		if (err) {
			console.log('Connection failed');
			console.log(err);
			process.exit(1);
		}
		console.log('Connected to database');

		// callback function to send database object
		callback(database.db(process.env.DB_NAME));
	});
}

module.exports = connect;
