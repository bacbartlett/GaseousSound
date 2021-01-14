import React from "react";
import {Paper, CircularProgress} from '@material-ui/core';
import SquareDisplay from "../GenrePage/SquareDisplay"

const MyPlaylistPage = (props) =>{
    let loaded = {props}
    if(props.playlists === "loading"){
        loaded = false;
    }
    return (
        <div className="GenreDisplay__Background">
        <div className="topTitleDiv">
            <h2>My Playlists</h2>
        </div>
        <div className="GenrePage__Container" >
            <Paper className="GenreDisplay">
                {props.loaded ? (props.playlists.map((el, ind)=> <SquareDisplay key={el.ind} imageUrl={el.PlaylistSongJoins[0].Song.Album.artworkUrl} title={el.title} link={`/users/playlists/${el.id}`} />)) : 
                <CircularProgress />}
            </Paper>
        </div>
        </div>
    )
}

export default MyPlaylistPage