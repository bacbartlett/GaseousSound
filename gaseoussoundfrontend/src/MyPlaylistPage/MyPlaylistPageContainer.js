import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getMyPlaylistsThunk, setDisplayData} from "../store/actions"
import MyPlaylistPage from "./MyPlaylistPage"

const MyPlaylistPageContainer = (props) => {
    const displayData = useSelector(state => state.displayData);
    const dispatch = useDispatch();

    const [loaded, setLoaded] = useState(false);
    const [playlist, setPlaylist] = useState("loading")

    useEffect(() =>{
        setLoaded(false)
        dispatch(setDisplayData("loading"))
        getMyPlaylistsThunk()(dispatch)
    }, []);

    useEffect(()=>{
        if(displayData && !(displayData === "loading") && displayData.map && displayData[0] && displayData[0].PlaylistSongJoins){
            setLoaded(true);
            setPlaylist(displayData)
        }
    }, [displayData])

    return(<MyPlaylistPage playlists={playlist} loaded={loaded} />)
    


}

export default MyPlaylistPageContainer;