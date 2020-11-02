import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MiniPlayer from "./MiniPlayer"

const MiniPlayerContainer = (props) =>{
    const playlist = useSelector(state=>state.currentPlaylist)
    const [currentSong, setCurrentSong] = useState();
    useEffect(()=>{
        setCurrentSong(playlist[0])
    },[playlist])
    // const song = {title: "Monotony", length: 185, liked: true, audioUrl:"https://gaseoussoundaudio.s3.us-east-2.amazonaws.com/1.mp3", lyrics: null, album: {title: "Modern Times", artworkUrl: "https://gaseoussoundphotos.s3.us-east-2.amazonaws.com/profileImages/2.jpg", artist: {artistName: "Dee Yan-Key"}}}
    return <MiniPlayer song={currentSong}/>
}

export default MiniPlayerContainer