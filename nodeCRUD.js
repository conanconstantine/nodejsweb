//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/notetest1';

var assert = require('assert');
var ObjectId = mongodb.ObjectID;

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);
    assert.equal(null, err);
    insertDocument(db, function() {
      db.close();
    });

    findEmpInfo(db, function(){
      db.close();
    });
  }
});


var insertDocument = function(db, callback) {
   db.collection('empInfo').insertOne( {
        "Emp No" : "7470277",
        "Emp Name" : "Conan Constantine Hung",
        "Project" : "Credit Architecture",
        "BG Check" : "Done",
        "Email" : "conan.hung@infosys.com",
        "Laptop ID" : "ITL-HW-LAPTP-000000108727"
}, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the empInfo collection.");
    callback();
  });
};

var findEmpInfo = function(db, callback) {
   var cursor =db.collection('empInfo').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};