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
const Transaction = require("../../models/transcations");
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
    // Form validation
    console.log(req.body);
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // User.findOne({ email: req.body.email }).then(user => {
    //   if (user) {
    //     return res.status(400).json({ email: "Email already exists" });
    //   } else {
    //     const newUser = new User({
    //       name: req.body.name,
    //       email: req.body.email,
    //       password: req.body.password
    //     });

    var result = req.body;
    var accNum = await AccountNumber.find();
    // console.log(">>>",accNum[0])
    // console.log(">>>>>>>>>>>>>>>>",accNum[0].accountNumber);
    // console.log(">>>>>>>>>>>>>>>>",typeof accNum[0].accountNumber);

    var val = accNum[0].accountNumber + 1;
    console.log(">>>>", val);
    AccountNumber.findOneAndUpdate(
        { index: "1" },
        { $set: { accountNumber: val } },
        { new: true },
        (err, doc) => {
            if (err) console.log(err);
            console.log(doc);
        }
    );

    // const transactionUser = new Transaction({
    //   accountNumber : val,
    //   balance : 0,
    //   transcations:[{}]
    // });
    // console.log(">>>>$$$",transactionUser)

    result.accountnumber = val;
    // result.transaction.balance=0;
    // result.transaction.transactions=[]

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
            user.save()
                .then((user) => res.json(user))
                .catch((err) => console.log(err));
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
        User.findOne({ accountnumber }).then((user) => {
            // Check if user exists
            if (!user) {
                return res
                    .status(404)
                    .json({ emailnotfound: "User is not registered" });
            }

            // Check password
            bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    // User matched
                    // Create JWT Payload
                    const payload = {
                        id: user.id,
                        name: user.firstname,
                    };

                    // Sign token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: 31556926, // 1 year in seconds
                        },
                        (err, token) => {
                            res.json({
                                accountnumber: accountnumber,
                                success: true,
                                token: "Bearer " + token,
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
//get user details

router.get("/:accountnumber", (req, res) => {
    let data = {};
    const accNo = req.params.accountnumber;
    console.log(accNo);

    User.find({ accountnumber: accNo })
        .then((result) => {
            res.status(200).json({ data: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

// router.get("/:accountnumber", (req, res) => {
//     let data = {};
//     const accNo = req.params.accountnumber;
//     console.log(accNo);

//     User.find({ accountnumber: accNo })
//         .then((result) => {
//             res.status(200).json({ data: result });
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({
//                 error: err,
//             });
//         });
// });

router.post("/payments", (req, res) => {
    const senderaccNo = req.body.senderAccountNumber;
    const receiveraccNo = req.body.receiverAccountNumber;
    const amt = req.body.amount;
    //const date = req.body.date;
    
    if(senderaccNo === receiveraccNo)
    {
      res.status(201).json({});
    }
    else{
    
    User.findOne({ accountnumber: senderaccNo })
        .then((sender) => {

          if(sender.paymentSession===false)
          {
            res.status(205).json({})
          }
          else{

            if (amt > sender.transaction.balance) {
                res.status(202).json({});
            } else {
                //sender
                sender.transaction.balance = sender.transaction.balance - amt;
                const newtransactions = {
                    to: receiveraccNo,
                    from: senderaccNo,
                    date: new Date(),
                    flag: false,
                    amount: amt,
                };
                console.log("SENDER", newtransactions);
                sender.transaction.transactions.push(newtransactions);
                console.log(
                    "ARRAY SENDER TRANSACTIONS",
                    sender.transaction.transactions
                );
                console.log(sender);

                //UPDATE sender db

                User.findOneAndUpdate(
                    {
                        accountnumber: senderaccNo,
                    },
                    {
                        $set: {
                            transaction: {
                                balance: sender.transaction.balance,
                                transactions: sender.transaction.transactions,
                            },
                        },
                    },
                    (err, doc) => {
                      // res.status(500).json({
                      //   error: "error updating user db",
                      //   });
                        if (err) console.log("error updating user db", err);
                        console.log(doc);
                    }
                );

                //receiver
                User.findOne({ accountnumber: receiveraccNo })
                    .then((receiver) => {
                        receiver.transaction.balance =
                            +receiver.transaction.balance + +amt;
                        const newtransactions = {
                            to: receiveraccNo,
                            from: senderaccNo,
                            date: new Date(),
                            flag: true,
                            amount: amt,
                        };

                        console.log("RECEIVER", newtransactions);
                        receiver.transaction.transactions.push(newtransactions);
                        console.log(
                            "ARRAY RECEIVER TRANSACTIONS",
                            receiver.transaction.transactions
                        );
                        console.log(receiver);

                        console.log(typeof receiver.transaction.transactions);
                        //UPDATE receiver db

                        User.findOneAndUpdate(
                            {
                                accountnumber: receiveraccNo,
                            },
                            {
                                $set: {
                                    transaction: {
                                        balance: receiver.transaction.balance,
                                        transactions:
                                            receiver.transaction.transactions,
                                    },
                                },
                            },
                            (err, doc) => {
                              // res.status(500).json({
                              //   error: "error updating user db",
                              //   });
                                if (err) console.log("error updating user db", err);
                                console.log(doc);
                            }
                        );

                        User.findOneAndUpdate(
                          {
                            accountnumber: senderaccNo,
                          },
                          {
                              $set: {
                                  paymentSession: false
                              },
                          },
                          (err, doc) => {
                            // res.status(500).json({
                            //   error: "error updating user db",
                            //   });
                              if (err) console.log("error updating user db", err);
                              console.log(doc);
                          }
                      );
                        res.status(200).json({ data: { sender, receiver } });
                    })
                    .catch((err) => {
                        res.status(202).json({data:err});
                    });
                    sender.paymentSession=false;
            }
          }
        })
        .catch((err) => {
            console.log(err);
            res.status(203).json({data:err});
        })
      };
})

function secureSession(paymentSession){

  
}

// function expires(accNo){
//   User.find({accNo}).then(result=>{

//     result.paymentSession=false;
//   })
//   .catch(err=>{
//     console.log(err);
//     res.status(500).json({
//       error:err
//     })
//   }
// }
router.post('/securepayment',(req,res)=>{

    const accNo=req.body.accountnumber;
    User.findOne({accountnumber:accNo}).then(user=>{
  
      console.log("-------")
      if(user.paymentSession===true)
      {
        console.log("PAYMENT NOT SECURE")
        res.status(201).json({data:"PAYMENT NOT SECURE"});
      }
      else
      {
        User.findOneAndUpdate(
          {
              accountnumber: accNo,
          },
          {
              $set: {
                  paymentSession: true
              },
          },
          (err, doc) => {
            // res.status(500).json({
            //   error: "error updating user db",
            //   });
              if (err) console.log("error updating user db", err);
              console.log(doc);
          }
      );
          //user.paymentSession=true
          res.status(400).json({data:"PAYMENT SECURE"});

      }
    }).catch((err) => {
      console.log(err);
      res.status(203).json({data:err});
    });
});


  

module.exports = router;
