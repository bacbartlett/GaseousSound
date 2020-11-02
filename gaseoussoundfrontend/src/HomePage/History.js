import React, { useEffect, useState} from "react";
import CustomHistoryDisplayer from "./CustomHistoryDisplayerContainer"
import {CircularProgress} from '@material-ui/core';

const History = (props) =>{
    const {recentHistory} = props;
    const [ifDisplay, setIfDisplay] = useState(false)
    /*
Expects a playlist as an array
Each song should have:
    .title
    .length
    .id
    .album.artworkUrl
    .album.artist.artistName
*/
    
    const display = recentHistory.map(el=>{
        if(!el.Album){
            return;
        }
        return {title: el.title, length: el.length, id: el.id, album: {artworkUrl: el.Album.artworkUrl, artist: {artistName: el.Album.User.artistName}}}
    })
    useEffect(()=>{
        if(display.length){
            setIfDisplay(true);
        }
    }, [display])
    

    return (
        <div className="HomePage__RecentHistoryContainer" >
        {ifDisplay ? <CustomHistoryDisplayer playlist={display} /> : <CircularProgress />}
        </div>
        )
}

export default History