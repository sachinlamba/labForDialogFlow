//npm install
//gcloud app deploy
//gcloud app browse

const mongodb = require('mongodb');
const nconf = require('nconf');

var express = require('express');
var app = express();

// Read in keys and secrets. Using nconf use can set secrets via
// environment variables, command-line arguments, or a keys.json file.
nconf.argv().env().file('keys.json');

// Connect to a MongoDB server provisioned over at
// MongoLab.  See the README for more info.

const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const port = nconf.get('mongoPort');

let uri = `mongodb://${user}:${pass}@${host}:${port}`;
if (nconf.get('mongoDatabase')) {
  uri = `${uri}/${nconf.get('mongoDatabase')}`;
}
console.log(uri);

// This responds with "Hello" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.end('Hello from Home Page');
});

// This responds a GET request for the /list_products page.
app.get('/list_products', function (req, res) {
   console.log("Got a GET request for the /list_products");
   mongodb.MongoClient.connect(uri, (err, mongoclient) => {
     if (err) {
       throw err;
     }
     var db = mongoclient.db("ppsample");
     let products = [];
     db.collection('products').find().toArray(function(err, items) {
        products = [...items]
        console.log("products from /productsList",products)
        mongoclient.close();
        res.json(products);
        res.end();
     });
    });
})

// This responds a GET request for the /list_user page.
app.get('/list_users', function (req, res) {
   console.log("Got a GET request for the /list_users");
   mongodb.MongoClient.connect(uri, (err, mongoclient) => {
     if (err) {
       throw err;
     }
     var db = mongoclient.db("ppsample");
     let users = [];
     db.collection('users').find().toArray(function(err, items) {
        users = [...items]
        console.log("users from /list_user",users)
        mongoclient.close();
        res.json(users);
        res.end();
     });
    });
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})


//Articles ------->
//https://cloud.google.com/community/tutorials/nodejs-mongodb-on-appengine
//https://stackoverflow.com/questions/43779323/typeerror-db-collection-is-not-a-function
//https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html
