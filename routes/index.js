var express = require('express');
var router = express.Router();

const app = express();

const bodyParser = require("body-parser")
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
router.get('/restaurants', async (req, res) => {

  try{
    const data = await  Model.find();
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
router.post('/restaurants',  async (req, res)  => {

  const data = new Model({
      name: req.body.name,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      emailAddress: req.body.emailAddress,
      rating: req.body.rating
  })

  try {
      const dataToSave = await data.save();
      console.log(res.status(200).json(dataToSave));
      //res.render('index', { title: 'Data saved' });

  }
  catch (error) {
    console.log(res.status(400).json({message: error.message}));
  }
})
//Delete function | this functions delete the data with the ID used
/*
Removes the restaurant from the database
*/
router.delete('/restaurants/:id', async (req, res) => {
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
