import React from "react";
import { useSelector } from "react-redux";
import PlusButtonForPlaylist from "./PlaylistModel"

const PlayListModelContainer = (props) =>{
    const playlists = useSelector(state=>state.playlists);

    return <PlusButtonForPlaylist song={props.song} songId={props.songId} playlists={playlists} />
}

export default PlayListModelContainer