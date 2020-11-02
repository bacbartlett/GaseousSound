import { CircularProgress } from "@material-ui/core";
import React from "react";
import SongDisplayContainer from "../../SongDisplay/SongDisplayContainer"



const SpecificPlaylistPage = (props) =>{
    let songs = props.songs
    if(props.loaded){
        songs = props.songs.map(el =>{
            el.album = el.Album;
            el.album.artist = {artistName: el.Album.User.artistName};
            return el;
        })
    };
    return (
        <div>
            <div className="topTitleDiv">
            <h2>{props.title}</h2>
        </div>
    {props.loaded ? <SongDisplayContainer playlist={songs} /> : <CircularProgress />}
    </div>
    )
    
}

export default SpecificPlaylistPage;