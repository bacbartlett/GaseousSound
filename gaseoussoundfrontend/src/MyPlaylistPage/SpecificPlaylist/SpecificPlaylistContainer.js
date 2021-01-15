import {getPlaylistSongs, setDisplayData} from "../../store/actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpecificPlaylistPage from "./SpecificPlaylist";

const SpecificPlaylistContainer = (props) =>{
    const [loaded, setLoaded] = useState(false);
    const [songs, setSongs] = useState([]);
    const [title, setTitle] = useState("")
    const dispatch = useDispatch();
    const displayData = useSelector(state=>state.displayData)


    useEffect(()=>{
        dispatch(setDisplayData("loading"));
        setLoaded(false);
        getPlaylistSongs(props.match.params.playlistId)(dispatch)
    },[]);

    useEffect(()=>{
        if(displayData && !(displayData === "loading") && displayData.PlaylistSongJoins){
            setSongs(displayData.PlaylistSongJoins.map(el=>el.Song));
            setTitle(displayData.title)
            setLoaded(true)
        }
    },[displayData]);

    return <SpecificPlaylistPage title={title} songs={songs} loaded={loaded} />
}

export default SpecificPlaylistContainer;