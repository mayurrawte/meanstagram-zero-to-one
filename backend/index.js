const express = require('express');
const MongoClient = require('mongodb').MongoClient
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
// parse application/json
app.use(bodyParser.json())
const username = ''; // add your username you have created in mongoatlas 
const password = ''; // add your password you have created in mongoatlas 
const url = ''; // add your url you have created in mongoatlas 

const dbString = "mongodb+srv://"+ username + ":" + password + "@" + url;
let db;

MongoClient.connect(dbString, function (err, client) {
  if (err) throw errw
  db = client.db('meanstagram');
  app.get('/', (req, res) => res.send('Hello World!'));
  app.get('/myname', (req, res) => {
    const name = req.query.name;
    res.send("Hello " + name);
  });
  app.get('/post', (req, res) => {
    db.collection('post').find().toArray(function (err, result) {
      if (err) throw err
      console.log(result)
    });
  });
  app.post('/post', (req, res) => {
    const data = req.body;
    db.collection('post').insertOne(data, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    });
    res.send({"success": "data inserted"});
  })

  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
})

