import { TextField } from "@material-ui/core";
import React, {useState} from "react";

const AddSong = (props) =>{
    
    const {handleSongTitles, addSongAtPoint} = props;

    const innerHandleSongTitles = (e) =>{
        handleSongTitles(props.index, e.target.value)
    }

    const innerHandleFileUpload = (e) =>{
        addSongAtPoint(props.index, e.target.files[0])
    }

    return(
        <div className="Upload__SongComp">
            <TextField value={props.songTitle} onChange={innerHandleSongTitles} autoFocus label={"Song Title"} />
            <div className="songFileInputDiv">
            <div className="SongUploadLabel">
                <h4>Song File</h4>
            </div>
            <div className="SongUpload">
                <input onChange={innerHandleFileUpload} type="file" />
            </div>
            </div>
        </div>
    )
}

export default AddSong;