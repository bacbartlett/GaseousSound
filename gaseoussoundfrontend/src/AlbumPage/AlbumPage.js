import { Paper } from "@material-ui/core";
import React from "react";
import SongDisplayContainer from "../SongDisplay/SongDisplayContainer";

const AlbumPage = (props) =>{
    return(
        <div className="albumPage">
            <div className="albumPage__albumCover">
                <div className="albumPage__conver" style={{backgroundImage: `url(${props.album.artworkUrl})`}} />
            </div>
            <div className="AlbumPage__SongListContainer">
                <SongDisplayContainer playlist={props.album.songs} />
            </div>
        </div>
    )
}

export default AlbumPage;