const express = require('express'); // include express 
const router = express.Router(); // include express router
const User = require('../models/User'); // for accessing schema from mdal
const { body, validationResult } = require('express-validator');  // express validator required include from official site
// npm install --save express-validator -- to install 
const bcrypt = require('bcryptjs');  //-- > bcrypt for secure password package creating passwords hash
// to add package -- > npm i bcryptjs

const JWT_SECRET = "nd"; //secret code to verify
const jwt = require('jsonwebtoken');  // token for verify user  
//to add package -->  npm i jsonwebtoken

const fetchuser = require('../middleware/fetchuser');  //include fetchuser function to verify user
// we can add this function when we want to verify user from database

// Post method used for security purpose , we can also use 'router.get instead'
// use validation only  code under -> router.post ('/', [ ***here***], (req,res)....) 

//Router 1 : create/add user .. no login required
router.post('/createuser', [
      body('aadhar', 'Enter a valid Aadhar').isLength({ min: 12 }),
      body('phone', 'Enter a valid Phone Number').isLength({ min: 10 }),
      body('email', 'Enter a valid Email').isEmail(),
      body('password', 'Password Must be atleast 5 character').isLength({ min: 5 }) // validator for each field from official site

], async (req, res) => {
      const errors = validationResult(req);
      let success = false;
      if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });  // for print error if validation false
      }
      try {
            let user = await User.findOne({ aadhar: req.body.aadhar })  // get aadhar value in user variable
            if (user) {
                  success = false;
                  return res.status(400).json({success,  error: "Sorry a user with this Aadhar already exists" });
            }
            const salt = await bcrypt.genSalt(10);  // form documentation of bcryptjs, making salt
            const secPass = await bcrypt.hash(req.body.password, salt) //  secPass = bcrypt.hash(password, salt) --> create a variable and put value in it
            // // bcrypt returns promises so have to use await in it.

            // Creating User adding to database
            user = await User.create({
                  aadhar: req.body.aadhar,
                  phone:req.body.phone,
                  email: req.body.email,
                  password: secPass,
            })
            const data = {
                  user : {
                        id : user.id
                  }
            }
            var validAadhar = req.body.aadhar;
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({validAadhar, success, authToken});

            //we used try catch if any another error may happen in future
      } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error Occurred!")
      }
      // this below code uses promises intead of this we use async await method

      // .then(user => res.json(user)) // storing entry to database
      //       .catch(err => {
      //             console.log(err) // if user enter same value matched in database (.catch error)
      //             res.json({ error: 'Please Enter Unique Values', message: err.message }) // err.message is used for default actual error
      //       })
})


//Router 2 :  login user .. no login required
router.post('/login', [
      body('aadhar', 'Enter a valid Aadhar Number').isLength({ min: 12 }),
      body('password', 'Password Cannot be blank').exists(), // validator for each field from official site

], async (req, res) => {
      let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });  // for print error if validation false
      }
      const { aadhar, password } = req.body;
      try {
            let user = await User.findOne({ aadhar });
            if (!user) {  // check if user exists
                  success = false;
                  return res.status(400).json({ success, error: "Please Use correct credentials" });
            }
            const passswordComapre =  await bcrypt.compare(password, user.password); // compare with existing password
            if (!passswordComapre) {
                  success = false;
                  return res.status(400).json({ success,  error: "Please Use correct credentials" });
            }
            const data = {
                  user : {
                        id : user.id
                  }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            var validAadhar = aadhar;
            res.json({validAadhar, success, authToken});

      } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error Occurred!")
      }
})

//Router 3 :  Get user .. Login required
router.post('/getuser', fetchuser, async (req, res) => {

      try {
            userId = req.user.id;
            const user = await User.findById(userId).select("-password"); // fetch all details exclude password 
            res.send(user); //send response
      } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error Occurred!")
      }
})
module.exports = router 