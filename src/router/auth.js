const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


require('../db/conn');
const User = require('../model/userSchema');

router.get("/", (req, res) => {
    res.send(" hello from Api from server router ")

});
// async await

router.post('/register', async (req, res) => {

    const { name, username, email, password,cpassword, patientid, vital_sign, note } = req.body;

    if (!name || !username || !email || !password ||  !cpassword || !patientid || !vital_sign || !note) {
        return res.status(422).json({ error: " please fill the correct proprly" });
    }

    try {
        const userExist = await User.findOne({ email: email })

        if (userExist) {
            return res.status(422).json({ error: " Email already exits" });
        } else if (password   != cpassword){
            return res.status(422).json({ error: " password are not matching" });

        } else {

            const user = new User({ name, username, email, password, cpassword , patientid, vital_sign, note });

            await user.save();
    
            res.status(201).json({ message: " user register successful" });
        }
      

    } catch (err) {
        console.log(err);

    }

});


//  Login route

router.post('/signin', async (req, res) => {
          
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: " please fill the data " });
        }

        const userLogin = await User.findOne({ email: email });

         // console.log(userLogin);

       if(userLogin){

        const isMatch = await bcrypt.compare(password, userLogin.password);
          
         token = await userLogin.generateAuthToken();
        console.log(token);
        
       if(!isMatch){
        res.status(400).json({error: " Invalid Credientials  "});
    } else {
        res.json({ message: " User Signin Successfuly" });

     } 
       } else {
        res.status(400).json({error: " Invalid Credientials  "});
       }
       


       

    } catch (err) {
        console.log(err);
    }
});

module.exports = router;