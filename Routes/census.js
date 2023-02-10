const express = require('express');
const router = express.Router();

const Census = require('../models/censusmodal');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
//const { findById } = require('../models/censusmodal');


//Route 1 : to get all census ; Login required - /api/census/fetchallcensus

//for user specific census

router.get('/fetchspecific', fetchuser, async (req, res) => {
  try {
    const census = await Census.find({ user: req.user.id })
    res.json(census)
  
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occurred!")
  }
})

router.get('/fetchallcensus', async function (req, res) {
   let census = Census.find({}, function(err, census){
    if(err){
        console.log(err);
    }
    else {
        res.json(census);
    }
});
});
// Route 2 : to add census ; Login required - /api/census/addcensus
router.post('/addcensus', fetchuser, [

  body('name', 'Enter Tname'),
  body('gender', 'Enter gender'),
  body('dob', 'Enter dob'),
  body('age', 'Enter age'),
  body('blood', 'Enter blood'),
  body('email', 'Enter email').isEmail(),
  body('phone', 'Enter phone'),
  body('marital', 'Enter marital'),
  body('mother', 'Enter mother'),
  body('father', 'Enter father'),
  body('grandFather', 'Enter grandFather'),
  body('spouse', 'Enter Wife/Husband'),
  body('dependent', 'Enter dependent'),
  body('income', 'Enter income'),
  body('unemployed', 'Enter unemployed'),
  body('familyCount', 'Enter familyCount'),
  body('children', 'Enter children'),
  body('nri', 'Enter nri'),
  body('gotra', 'Enter gotra'),
  body('kuldevi', 'Enter kuldevi'),
  body('kuldevta', 'Enter kuldevta'),
  body('howyouknow', 'Enter howyouknow'),
  body('native', 'Enter native'),
  body('permanentAddress', 'Enter permanentAddress'),
  body('currentAddress', 'Enter currentAddress'),
  body('vichar', 'Enter vichar'),
  body('remark', 'Enter remark'),
  
], async (req, res) => {
  
  try {

    const {  name,  gender,  dob,  age,  blood,  email,  phone,  marital,  income,  mother, father, 
      grandFather,  spouse,  unemployed,  familyCount,  children,  dependent,  nri,  gotra, 
       kuldevi, kuldevta,  howyouknow,  native,  permanentAddress,  currentAddress,  vichar,  remark  } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      
      return res.status(400).json({ errors: errors.array() });  // for print error if validation false
    }
    const census = new Census({
      name,  gender,  dob,  age,  blood,  email,  phone,  marital,  income,  mother, father, 
       grandFather,  spouse,  unemployed,  familyCount,  children,  dependent,  nri,  gotra, 
        kuldevi, kuldevta,  howyouknow,  native,  permanentAddress,  currentAddress,  vichar,  remark, user: req.user.id
    })
    const savedCensus = await census.save();
    res.json(savedCensus);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occurred!")
  }
})

// Route 3 : to update census ; Login required  -/api/census/updatecensus
router.put('/updatecensus/:id', fetchuser, async (req, res) => {
  const {   name,  gender,  dob,  age,  blood,  email,  phone,  marital,  income,  mother, father, 
     grandFather,  spouse,  unemployed,  familyCount,  children,  dependent,  nri,  gotra, 
      kuldevi, kuldevta,  howyouknow,  native,  permanentAddress,  currentAddress,  vichar,  remark } = req.body

  // createing new census object
  const newCensus = {};
  if (name) { newCensus.name = name };
  if (gender) { newCensus.gender = gender };
  if (dob) { newCensus.dob = dob };
  if (age) { newCensus.age = age };
  if (blood) { newCensus.blood = blood };
  if (email) { newCensus.email = email };
  if (phone) { newCensus.phone = phone };
  if (marital) { newCensus.marital = marital };
  if (income) { newCensus.income = income };
  if (mother) { newCensus.mother = mother };
  if (father) { newCensus.father = father };
  if (grandFather) { newCensus.grandFather = grandFather };
  if (spouse) { newCensus.spouse = spouse };
  if (unemployed) { newCensus.unemployed = unemployed };
  if (familyCount) { newCensus.familyCount = familyCount };
  if (children) { newCensus.children = children };
  if (dependent) { newCensus.dependent = dependent };
  if (nri) { newCensus.nri = nri };
  if (gotra) { newCensus.gotra = gotra };
  if (kuldevi) { newCensus.kuldevi = kuldevi };
  if (kuldevta) { newCensus.kuldevta = kuldevta };
  if (howyouknow) { newCensus.howyouknow = howyouknow };
  if (native) { newCensus.native = native };
  if (permanentAddress) { newCensus.permanentAddress = permanentAddress };
  if (currentAddress) { newCensus.currentAddress = currentAddress };
  if (vichar) { newCensus.vichar = vichar };
  if (remark) { newCensus.remark = remark };

  //find the census to updated and update it
  let census = await Census.findById(req.params.id);

  if (!census) { return res.status(404).send('Not found') }  // if census not found
  //if (census.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") } // if census is not belongs to loggedin user

  census = await Census.findByIdAndUpdate(req.params.id, { $set: newCensus }, { new: true })
  res.json({ census })

})

// Route 3 : to delete census ; Login required  -/api/census/deletecensus
router.delete('/deletecensus/:id', fetchuser, async (req, res) => {
  const {  name,  gender,  dob,  age,  blood,  email,  phone,  marital,  income,  mother, father, 
    grandFather,  spouse,  unemployed,  familyCount,  children,  dependent,  nri,  gotra, 
     kuldevi, kuldevta,  howyouknow,  native,  permanentAddress,  currentAddress,  vichar,  remark} = req.body

  //find the census to delete and delete it
  let census = await Census.findById(req.params.id);

  if (!census) { return res.status(404).send('Not found') }  // if census not found
  //if (census.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") } // if census is not belongs to loggedin user

  census = await Census.findByIdAndDelete(req.params.id)
  res.json({ "Success": "data has been deleted", census: census })

})
module.exports = router 