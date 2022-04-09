const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/user.model");
const AccountNumber = require("../../models/acc_number");
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register",async  (req, res) => {
  // Form validation
  console.log(req.body);
  const { errors, isValid } = validateRegisterInput(req.body);
  
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  };

  // User.findOne({ email: req.body.email }).then(user => {
  //   if (user) {
  //     return res.status(400).json({ email: "Email already exists" });
  //   } else {
  //     const newUser = new User({
  //       name: req.body.name,
  //       email: req.body.email,
  //       password: req.body.password
  //     });


    var result=req.body;
    var accNum = await AccountNumber.find();
    console.log(">>>",accNum[0])
    console.log(">>>>>>>>>>>>>>>>",accNum[0].accountNumber);
    console.log(">>>>>>>>>>>>>>>>",typeof accNum[0].accountNumber);

    var val = accNum[0].accountNumber + 1;
    console.log(">>>>",val);
    AccountNumber.findOneAndUpdate(
      { index: "1" },
      { $set: { accountNumber: val } },
      { new: true },
      (err, doc) => {
        if (err) console.log(err);
        console.log(doc);
      },
    );

    result.accountnumber = val;
    const user = new User(result);
    // const newUser = new User({
    //         name: req.body.name,
    //         email: req.body.email,
    //         password: req.body.password
    //       });


      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    
}),


  

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const accountnumber = req.body.accountnumber;
  const password = req.body.password;

  // Find user by email
  User.findOne({ accountnumber }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "User is not registered" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.firstname
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});
module.exports = router;
