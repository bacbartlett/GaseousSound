const express = require("express")
const AWS = require("aws-sdk");
const asyncHandler = require("../utils/asyncHandler");
const multer = require("multer");
const upload = multer();
const {Album, Song, User} = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/index");
const {jwtConfig: {secret}} = config;
const getMP3Duration = require('get-mp3-duration')

const router = express.Router();
console.log("access ", config.awsConfig.accessKey, "***")
console.log("secret ", config.awsConfig.secretKey, "***")
console.log("region ", config.awsConfig.region)
AWS.config.update({
    secretAccessKey: config.awsConfig.secretKey,
    accessKeyId: config.awsConfig.accessKey,
    region: config.awsConfig.region
})

const s3 = new AWS.S3();







router.post("/", upload.any(), asyncHandler(async (req,res,next) => {
    // console.log(req.files);
    // console.log(req.files.map(el=>el.mimetype));
    // console.log(req.body)
    console.log(jwt.verify(req.body.userToken, secret))
    try{
        const user = await User.findOne({where:{ artistName: jwt.verify(req.body.userToken, secret)}});
        console.log(user)
        const artworkUpload = {
            Bucket: "gaseoussoundphotos",
            Key: Date.now().toString() + req.files[0].originalname,
            Body: req.files[0].buffer,
            ACL: "public-read",
            ContentType: req.files[0].mimetype

        }
        const upload = await s3.upload(artworkUpload).promise();
        req.body.locations = [];
        const locations = req.body.locations;
        locations.push(upload.Location);

        for(let i = 1; i < req.files.length; i++){
            const file = req.files[i];
            const params = {
                Bucket: "gaseoussoundaudio",
                Key: Date.now().toString() + file.originalname,
                Body: file.buffer,
                ACL: "public-read",
                ContentType: file.mimetype
            }
            const songUpload = await s3.upload(params).promise();
            locations.push(songUpload.Location);
        }

        const album = await Album.create({title: req.body.albumTitle, userId: user.id, artworkUrl: locations[0], genreId: 1})
        for(let i=1; i < locations.length; i++){
            console.log(req.body, req.body.songTitles)
            const song = await Song.create({title: req.body.songTitles.split(",")[i-1], length: Math.ceil((getMP3Duration(req.files[i].buffer) * .001)), albumId: album.id, audioUrl: locations[i], lyrics: ""})
        }

        res.json({message:"Success", id: album.id})

        





    }catch(e){
        console.log(e)
        res.json({message:"Please Log In"})
        return;
    }


}))


module.exports = router;