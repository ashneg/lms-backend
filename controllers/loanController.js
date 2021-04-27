const mongoose = require('mongoose');
const express = require('express');
const {loans} = require('../models/loan');
// const {userSchema} = require('../models/userSchema');

const auth = require('../middlewares/authUser');
const admin = require('../middlewares/authAdmin');

const router = express.Router();

/*
routes to be made
1. Create loan (user/admin)
2. Get list of all loans (admin)
3. Get loan with id (admin/user if loggedin)
4. Approve loan (admin)(patch)
5. Cancel loan (admin/user)(del)
*/


//Create a loan [user,admin]
//validate using joi valodator
router.post('/loans',async(req,res,next)=>{
    try{
        // console.log(req.body[0].phoneNumber);
        const loan = new loans({
            id: req.body[0].id,
            userName: req.body[0].userName,
            phoneNo: req.body[0].phoneNumber,
            email: req.body[0].email,
            loanAmount: req.body[0].loanAmount,
            status: (req.body[0].status).toLowerCase(),
            creditScore: req.body[0].creditScore
        });
        
        // //Credit score based condition could be placed
        const output = await loan.save();
        res.status(201).send(output);
        
    }
    catch(error){
        console.log(error);
    }
});

// [{
//     "userName": "Ashutosh",
//     "phoneNumber": "7007764630",
//     "email": "ashcbneg@gmail.com",
//     "loanAmount":"50000",
//     "status":"New",
//     "creditScore":"20"
// }]


//Get req admin only
router.get('/loans?:status?:loanAmountGreater?',async(req,res,next)=>{
    try{
        const status = req.query.status;
        const loanAmountGreater = req.query.loanAmountGreater;
        // res.send({status,loanAmountGreater});
        if(status || loanAmountGreater)loans.find({
            status : req.query.status,
            loanAmount : {$gt: req.query.loanAmountGreater}
        },(err,loan)=>{
            res.status(200).send(loan);
        });
        else if(status && !loanAmountGreater)loans.find({
            status : req.query.status,
        },(err,loan)=>{
            res.status(200).send(loan);
        });
        else if(!status && loanAmountGreater)loans.find({
            loanAmount : {$gt: req.query.loanAmountGreater}
        },(err,loan)=>{
            res.status(200).send(loan);
        });
        else loans.find({},(err,loan)=>{
            var allLoans = {};
            loan.forEach(l => {
                allLoans[l._id] = l;
            });
            res.send(allLoans);
        });
        
    }
    catch(error){
        console.log(error);
    }
});



//get loan with id
/*
    to do
    response when not found
*/
router.get('/loans/:id',async(req,res)=>{
    try{
        await loans.findOne({_id: req.query.id}).then(loan =>{
            if(loan) res.status(200).json(loan);
            else res.status(404).json("not Found");
        });
    }
    catch(error){
        console.log(error);
    }
});


//Status approval or deniyal
//check only status gets updated
//enum error
router.put('/loans/:id',async(req,res)=>{
    try{
        var valid = ['new','approved','rejected','cancelled'];
        if(!loans.findOne({_id:req.query.id})){
            res.status(404).send("Does not exist");
        }
        if(!valid.includes((req.body.status).toLowerCase())) res.status(400).send("Can't update");
        loans.findByIdAndUpdate(req.query.id,{status: req.body.status},(err,loan)=>{
            return res.send(loan);
        });
    }
    catch(error){
        console.log(error);
    }
});


//delete by id
//some error if id not exists
router.delete('/loans/:id',async(req,res)=>{
    try{
        const loan = await loans.findOne({_id: req.query.id}).then(loan =>{
            if(!loan) res.status(404).json("not Found");
        });
        await loans.findByIdAndRemove(req.query.id,(err,loan)=>{
            return res.status(200).send("Successfully deleated");
        });
    }
    catch(error){
        console.log(error);
    }
});


module.exports = router;