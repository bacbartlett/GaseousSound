const express = require("express");
const {User, Album, Song} = require("../models");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(async(req, res, next)=>{
    const albums = await Album.findAll()
    res.json(albums)
}))

router.get("/:albumId", asyncHandler(async(req, res, next) =>{
    const album = await Album.findOne({where: {id:req.params.albumId}, include:[{model: Song}, {model: User}]});
    const albumToSend = {};
    albumToSend.title = album.title;
    albumToSend.id = album.id;
    albumToSend.songs = album.Songs;
    albumToSend.artistName = album.User.artistName;
    albumToSend.artworkUrl = album.artworkUrl;
    albumToSend.songs = albumToSend.songs.map(el=>{
        const song = el;
        song.dataValues.album = {title: albumToSend.title, artworkUrl: albumToSend.artworkUrl, artist:{artistName: albumToSend.artistName}}
        console.log(song)
        return song;
    })
    console.log(albumToSend)
    res.json(albumToSend)
}))






module.exports = router;