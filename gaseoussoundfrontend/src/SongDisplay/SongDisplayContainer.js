import React from "react";
import SongDisplay from "./SongDisplay";

/*
Expects a playlist as an array
Each song should have:
    .title
    .length
    .id
    .album.artworkUrl
    .album.artist.artistName
*/

const SongDisplayContainer = (props) =>{
    const playlist = props.playlist
    return <SongDisplay playlist={playlist} width={props.width} />
}

export default SongDisplayContainer