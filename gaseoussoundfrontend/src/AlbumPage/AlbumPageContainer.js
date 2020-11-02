import React, { useEffect, useState } from "react";
import AlbumPage from "./AlbumPage";
import {getAlbumInfoThunk} from "../store/actions"
import { useDispatch, useSelector } from "react-redux";
import {CircularProgress} from '@material-ui/core';

const AlbumPageContainer = (props) =>{
    const dispatch = useDispatch();
    const displayData = useSelector(state=>state.displayData)

    const [album, setAlbum] = useState("");
    const [loaded, setLoaded] = useState(false)

    useEffect(()=>{
        getAlbumInfoThunk(props.match.params.albumId)(dispatch)
    }, []);
    useEffect(()=>{
        if(displayData && displayData.album){
            setAlbum(displayData.album);
            setLoaded(true)
        }
    }, [displayData]);

    return (
        <div className="albumPageContainer">
            {loaded ? <AlbumPage loaded={loaded} album={album} /> : <CircularProgress />}
        </div>
        )
}

export default AlbumPageContainer