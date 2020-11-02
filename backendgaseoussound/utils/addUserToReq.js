const asyncHandler = require("./asyncHandler")
const {User} = require("../models/");
const jwt = require("jsonwebtoken");
const config = require("../config/index");
const {jwtConfig: {secret}} = config;


const addUserToReq = asyncHandler(async (req, res, next) => {
    try{
        {const artistName = jwt.verify(req.body.gaseoussoundToken, secret);
        let user = await User.findOne({where: {artistName}})
        if(!user){
            user = null;
        };
        req.user = user;
        next();}

    } catch(e){
        req.user = null;
        //console.log(e);
        next();
    }
})

const createToken = (artistName) =>{
    return jwt.sign(artistName, secret);
}


module.exports = {
    addUserToReq,
    createToken
}