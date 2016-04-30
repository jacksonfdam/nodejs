// This is called by package.json post-install script to clean the database

var MongoClient = require('mongodb').MongoClient,
    format = require('util').format;

//connect away
MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if (err) throw err;

    db.dropCollection("testCollection", function() {
        process.exit(0);
    });
})