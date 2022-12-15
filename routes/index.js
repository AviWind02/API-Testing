var express = require('express');
var router = express.Router();

const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({
	extended:true
}));

//Config
require('dotenv').config();

//MongoStuff
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection
mongoose.set('strictQuery', true); //suppressing a warning for this test
//Catch any errors with the database
database.on('error', (error) => {
  console.log(error)
})

//Model
const Model = require('../Models/model');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//Post function | this functions posts data into the DB for the (name address phoneNumber emailAddress rating (a number from 1 to 10))
router.post('/post', async (req, res) => {
  const data = new Model({
      name: req.body.name,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      emailAddress: req.body.emailAddress,
      rating: req.body.rating

  })

  try {
      const dataToSave = await data.save();
      console.log(res.status(200).json(dataToSave))
  }
  catch (error) {
    console.log(res.status(400).json({message: error.message}))
  }
})

module.exports = router;
