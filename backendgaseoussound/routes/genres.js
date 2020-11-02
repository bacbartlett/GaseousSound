const express = require("express");
const {Genre, Album, Song, User} = require("../models/index");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(async(req, res, next)=>{
    const genres = await Genre.findAll();
    const genreNames = genres.map(el=>{return {title:el.title, id:el.id}});
    const genresWithArtwork = [];
    for(let i = 0; i < genreNames.length; i++){
        const genre = genreNames[i];
        const anAlbum = await Album.findOne({where: {genreId: genreNames[i].id}});
        genre.artWork = anAlbum.artworkUrl;
    }
    res.json(genreNames)
}));

router.get("/:genreId/albums", asyncHandler(async(req, res, next)=>{
    const albums = await Album.findAll({where:{genreId: req.params.genreId}, include: User});
    const albumsToSend = albums.map(el=> {return {id: el.id, title: el.title, artworkUrl: el.artworkUrl}});
    res.json(albumsToSend)
}))

router.get("/:genreId/songs", asyncHandler(async(req, res, next)=>{
    const albums = await Album.findAll({where:{genreId: req.params.genreId}, include: [{model: User}, {model: Song}]});
    const songs = [];
    albums.forEach(el=>{
        el.Songs.forEach(innerEl=>{
            const song = {}
            song.title = innerEl.title;
            song.artist = {artistName: el.User.artistName, id: el.User.id};
            song.album = {title: el.title, artworkUrl: el.artworkUrl}
            song.length = innerEl.length;
            songs.push(song)
        })
    });
    res.json(songs)
}))






module.exports = router;