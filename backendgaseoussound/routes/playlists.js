const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const {Playlist, PlaylistSongJoin, Song, Album, User} = require("../models")

const router = express.Router();

router.post("/", asyncHandler(async(req, res, next) =>{
    if(req.user === null){
        res.json({message: "Please login"})
    }
    const playlists = await Playlist.findAll({where:{userId: req.user.id}});
    res.json(playlists);
}));

router.post("/my", asyncHandler(async(req, res, next) =>{
    if(req.user === null){
        res.json({message: "Please login"})
    }
    const playlists = await Playlist.findAll({where:{userId: req.user.id}, include: {model: PlaylistSongJoin, include:{model: Song, include: {model: Album}}}});
    res.json(playlists);
}));

router.post("/newPlaylist", asyncHandler(async(req, res, next) =>{
    const {title} = req.body;
    if(!req.user){
        res.json({message: "Please log in"});
        return;
    }
    const playlist = await Playlist.create({public: true, userId: req.user.id, title});
    res.json(playlist);
}))

router.post("/:playlistId/:songId", asyncHandler(async(req,res,next)=>{
    if(!req.user){
        res.json({message: "Please log in"})
        return
    }
    const playlist = await Playlist.findByPk(req.params.playlistId);
    if(req.user.id !== playlist.userId){
        res.json({message: "This playlist belongs to another user"})
        return
    };
    await PlaylistSongJoin.create({playlistId: req.params.playlistId, songId: req.params.songId});
    res.json({message: "Success!"})

}));

router.delete("/:playlistId/:songId", asyncHandler(async(req,res,next)=>{
    if(!req.user){
        res.json({message: "Please log in"})
        return
    }
    const playlist = await Playlist.findByPk(req.params.playlistId);
    if(req.user.id !== playlist.userId){
        res.json({message: "This playlist belongs to another user"})
        return
    };
    const toDelete = await PlaylistSongJoin.findOne({playlistId: req.params.playlistId, songId: req.params.songId});
    await toDelete.destroy();
    res.json({message: "Success!"})

}));

router.post("/:playlistId", asyncHandler(async(req, res, next)=>{
    const playlist = await Playlist.findOne({where: {id: req.params.playlistId}, include:{model: PlaylistSongJoin, include:{model: Song, include:{model: Album, include: {model: User}}}}});
    if(!playlist.public && (!req.user || (playlist.userId !== req.user.id))){
        res.json({message: "This is a private playlist"})
        return;
    }
    res.json(playlist)
}));




module.exports = router;