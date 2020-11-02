import React from "react";
import CustomHistoryDispalyer from "./CustomHistoryDisplayer";

/*
Expects a playlist as an array
Each song should have:
    .title
    .length
    .id
    .album.artworkUrl
    .album.artist.artistName
*/

const CustomHistoryDispalyerContainer = (props) =>{
    const playlist = props.playlist
    return <CustomHistoryDispalyer playlist={playlist} width={props.width} />
}

export default CustomHistoryDispalyerContainer