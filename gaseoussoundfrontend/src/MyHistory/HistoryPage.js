import React from "react";
import { CircularProgress } from "@material-ui/core";
import SongDisplayContainer from "../SongDisplay/SongDisplayContainer"

const HistoryPage = (props) =>{
    let myHistory;
    if(props.myHistory.map){
        myHistory = props.myHistory.map(el=>{
            const song = el.Song;
            song.album = el.Song.Album;
            song.album.artist = {artistName: el.Song.Album.User.artistName};
            return song
        })
    }
    return(
        <div>
            <div className="topTitleDiv">
            <h2>My Listening History</h2>
        </div>
    {props.loaded ? <SongDisplayContainer playlist={myHistory} /> : <CircularProgress />}
    </div>
        )
}

export default HistoryPage