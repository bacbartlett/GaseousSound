const express = require("express");
const sessionRouter = require("./session");
const genresRouter = require("./genres");
const albumRouter = require("./albums")
const playlistRouter = require("./playlists");
const historyRouter = require("./history")
const userRouter = require("./users");
const likeRouter = require("./likes")
const uploadRouter = require("./upload")
const addUserToReq = require("../utils/addUserToReq").addUserToReq


const router = express();


router.use(addUserToReq)
router.use("/session", sessionRouter);
router.use("/genres", genresRouter);
router.use("/albums", albumRouter);
router.use("/playlists", playlistRouter);
router.use("/history", historyRouter)
router.use("/users", userRouter)
router.use("/likes", likeRouter);
router.use("/upload", uploadRouter)

router.get("/", (req, res)=>{
    res.send("Hello world")
})


module.exports = router;