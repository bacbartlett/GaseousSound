const asyncHandler = require("../utils/asyncHandler");
const {Album, User, Playlist, Song} = require("../models")
const express = require("express");


const router = express.Router();

router.get("/:userId/albums", asyncHandler(async(req,res,next)=>{
    const albums = await Album.findAll({where:{userId: req.params.userId}, include:{model: User}});
    res.json(albums);
}))


module.exports = router;