const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const {Like} = require("../models")

const router = express.Router();

router.post("/:songId", asyncHandler(async(req, res, next)=>{
    if(!req.user){
        res.json({message: "Please log in"});
    }
    const like = await Like.findOne({where: {userId: req.user.id, songId: req.params.songId}});

    res.json({likeStatus: !!like})
}))

router.put("/:songId", asyncHandler(async(req, res, next)=>{
    if(!req.user){
        res.json({message: "Please log in"});
    }
    const like = await Like.create({userId: req.user.id, songId: req.params.songId});

    res.json({likeStatus: !!like})
}))


router.delete("/:songId", asyncHandler(async(req, res, next)=>{
    if(!req.user){
        res.json({message: "Please log in"});
    }
    const like = await Like.findOne({where: {userId: req.user.id, songId: req.params.songId}});
    await like.destroy();
    res.json({likeStatus: false})
}))

module.exports = router;