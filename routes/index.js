var express = require('express');
var router = express.Router();
var app = express();

//Json
var bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Config
require('dotenv').config();

//MongoStuff
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection
//Catch any errors with the database
database.on('error', (error) => {
  console.log(error)
})
database.once('connected', () => {
  console.log('Database Connected OK');//Logs ok to know if good
})

//Model
const Model = require('../Models/model');

//Get function | this function gets all the data and shows it
/*
Lists all restaurants in the database
(unfiltered)
 */
router.get('/api/restaurants', async (req, res) => {

  try{
    //This limit the data to only show 10 
    const data = await Model.find().limit(10);//assuming this is what your wanted when you said Each page should show only 10 items at a time. i hope XD
    //const data = await Model.find()//Debuging becasue my data was way down 
    res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
});
//Post function | this functions posts data into the DB for the (name address phoneNumber emailAddress rating (a number from 1 to 10))
/*
Creates a new restaurant record in the
database with the information provided
*/
router.post('/api/restaurants',   function (req, res)  {

  const data = new Model({

      name: req.body.name,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      emailAddress: req.body.emailAddress,
      rating: req.body.rating
  })
  console.log(req.body);
  try {
      const dataToSave = data.save();
      console.log(res.status(200).json(dataToSave));

  }
  catch (error) {
    //console.log(res.status(400).json({message: error.message}));
  }
})
//Delete function | this functions delete the data with the ID used
/*
Removes the restaurant from the database
*/
router.delete('/api/restaurants/:id', async (req, res) => {
  console.log("Deleting data.");
  try {
      const id = req.params.id;
      const data = await Model.findByIdAndDelete(id);
      console.log(res.send(`Document with ${data.name} has been deleted..`));

  }
  catch (error) {
    console.log(res.status(400).json({ message: error.message }));
  }})

module.exports = router;
