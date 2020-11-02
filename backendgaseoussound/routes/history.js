const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const {Listen, Song, User, Album} = require("../models")

const router = express.Router();

router.post("/getall", asyncHandler(async(req, res, next) =>{
    if(!req.user){
        res.json({message: "Please log in"})
        return
    }
    const history = await Listen.findAll({where: {userId: req.user.id}, order: [["createdAt", "DESC"]] ,include: {model: Song, include: {model: Album, include: {model: User}}}});
    res.json(history)
}))

router.post("/getrecent", asyncHandler(async(req, res, next) =>{
    if(!req.user){
        res.json([])
        return
    }
    const history = await Listen.findAll({order: [["createdAt", "DESC"]], where: {userId: req.user.id}, limit: 3, include: {model: Song, include: {model: Album, include: {model: User}}}});
    const historyToSend = history.map(el=>el.Song)
    res.json(historyToSend)
}))

router.post("/:songId", asyncHandler(async (req, res, next) =>{
    console.log("Got to the listen part", req.user)
    if(!req.user){
        res.json({message: "History not tracked because user is not logged in"})
        return
    }
    console.log("Creating listen")
    await Listen.create({userId: req.user.id, songId: req.params.songId});
    res.json({message: "History saved"})
}))


module.exports = router;