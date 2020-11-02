const express = require("express");
const bcrypt = require("bcryptjs");
const asyncHandler = require("../utils/asyncHandler");
const {User, Listen} = require("../models");
const {createToken} = require("../utils/addUserToReq")
const { Op } = require("sequelize");


const router = express.Router();

router.post("/login", asyncHandler(async(req, res, next)=>{
    const {email, password} = req.body;
    const user = await User.findOne({where:{email: email}});
    if(!user){
        res.json({messages: ["Username or password is incorrect"]})
        return
    }
    console.log(user)
    const verify = bcrypt.compareSync(password, user.hashedPassword.toString());
    if(verify){
        const history = await Listen.findAll({where:{userId: user.id}, limit: 3});
        const token = createToken(user.artistName);
        res.cookie("gaseoussoundToken", token, {httpOnly: false});
        res.cookie.httpOnly = false;
        console.log(token);
        console.log(res.cookie)
        res.json({artistName: user.artistName, history, token, profileImageUrl: user.profileImageUrl })
        return
    } else{
        res.json({messages: ["Username or password is incorrect"]})
        return
    }
}));

router.post("/restore", asyncHandler(async (req, res, next)=>{
    console.log("I was run", req.user);
    if(!req.user){
        res.json(null)
    }
    const response = {};
    response.artistName = req.user.artistName;
    response.profileImageUrl = req.user.profileImageUrl;
    const token = createToken(req.user.artistName);
    response.newToken = token;
    const history = await Listen.findAll({where:{userId: req.user.id}, limit: 3});
    response.history = history;
    res.json(response);
}))

router.post("/signup", asyncHandler( async (req, res, next)=>{
    const {firstName, lastName, artistName, email, password, profileImageUrl} = req.body;
    const checks = await Largechecker(firstName, lastName, artistName, email, password)
    if(checks){
        res.json({messages: checks});
        return
    } else {
    const user = await User.create({firstName, lastName, artistName, email, profileImageUrl, hashedPassword: bcrypt.hashSync(password)});
    if(!user){
        res.json({messages: ["An error has occured. Please try again"]});
        return
    } else{
        const history = await Listen.findAll({where:{userId: user.id}, limit: 3});
        const token = createToken(user.artistName)
        // res.cookie("gaseoussoundToken", token, {httpOnly: false})
        res.json({artistName: user.artistName, history, token, profileImageUrl: user.profileImageUrl })
        return
    }
}
}));

router.post("/checkforsignup", asyncHandler(async (req, res, next)=>{
    const {artistName, email} = req.body;
    const checks = await checker(artistName, email)
    if(checks){
        res.json({messages: checks});
        return
    } else {
        res.json({signup: "redirect to signup"})
        return
    }
}))

const checker = async(artistName, email)=>{
    const artistNameCheck = await User.findOne({where:{artistName}});
    const emailCheck = await User.findOne({where: {email}});
    console.log(artistNameCheck, emailCheck)
    if(!artistNameCheck && !emailCheck){
        return false;
    };
    const errors = [];
    if(artistNameCheck){
        errors.push(`That artist name ${artistName} is already taken. Please try another`)
    };
    if(emailCheck){
        errors.push(`The email address ${email} is already in use. Maybe try logging in?`)
    }
    return errors
}

const Largechecker = async (firstName, lastName, artistName, email, password) =>{
    let errors = [];
    const doubleCheck = await checker(artistName, email);
    if(doubleCheck){
        doubleCheck.forEach(el=>errors.push(el))
    };
    if(!firstName.length){
        errors.push("First name is required")
    };
    if(!lastName.length){
        errors.push("Last name is required");
    };
    if(!artistName.length){
        errors.push("Artist name is required")
    };
    if(!email.length){
        errors.push("Email Address is required")
    };
    if(!password.length){
        errors.push("Password is required")
    };
    if(errors.length === 0){
        errors = false
    }
    return errors
}

// router.post("/logout")



module.exports = router;