import React, {useState} from "react";
import {TextField, Paper, Button} from '@material-ui/core';
import AddSong from "./AddSong"
import baseUrl from "../Globals/baseUrl";
import {CircularProgress} from '@material-ui/core';
import { useHistory } from "react-router-dom";

const UploadSong = (props) => {
    const history = useHistory();

    const [albumTitle, setAlbumTitle] = useState("");
    const [numberOfSongs, setNumberOfSongs] = useState([]);
    const [albumArtwork, setAlbumArtwork] = useState("");
    const [songTitles, setSongTitles] = useState([]);
    const [songFiles, setSongFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    
    const handleAlbumTitleUpdate = (e) => setAlbumTitle(e.target.value);
    const addSongComponent = () => setNumberOfSongs([...numberOfSongs, "I am a new song"]);

    const handleAlbumArtwork = (e) => setAlbumArtwork(e.target.files[0]);
    
    const addSongAtPoint = (index, file) => {
        const currentState = [...songFiles];
        currentState[index] = file;
        setSongFiles(currentState);
    }

    const handleSongTitles = (index, title) =>{
        const currentState = [...songTitles];
        currentState[index] = title;
        setSongTitles(currentState);
    }

    const handleFormSubmit = async() =>{
        setUploading(true);
        const data = new FormData();

        data.append("userToken", localStorage.getItem("gaseousSoundToken"))
        data.append("albumTitle", albumTitle);
        data.append("albumArtwork", albumArtwork);
        data.append("songTitles", songTitles);
        for(let i = 0; i < songFiles.length; i++){
            data.append(`songFile${i}`, songFiles[i])
        }

        const res = await fetch(`${baseUrl}/api/upload`, {
            method: "POST",
            body: data
        })

        const response = await res.json();
        if(response.id){
            history.push(`/albums/${response.id}`)
        }

    }


    
    return(
        <div className="UploadPage">
            <Paper className="UploadFormContainer">
                <div className="UploadFormTitleDiv">
                    <h2>Upload A New Album</h2>
                </div>
                <div className="UploadFormProperContainer">
                <div className="UploadFormInputDiv">
                <TextField autoFocus value={albumTitle} onChange={handleAlbumTitleUpdate} id="AlbumTitle" label="Album Title" type="text" />
                </div>
                <div className="UploadFormInputDiv">
                <h4>Album Artwork</h4>
                <input onChange={handleAlbumArtwork} type="file" />
                </div>
                </div>
                {numberOfSongs.map((el, ind) => <AddSong index={ind} songTitle={songTitles[ind]} songFile={songFiles[ind]} handleSongTitles={handleSongTitles} addSongAtPoint={addSongAtPoint} />)}
                <div className="uploadButtonContainer">
                <Button className="AddSongButton" color="primary" variant="outlined" onClick={addSongComponent}>Add Song</Button>
                </div>
                <div className="uploadButtonContainer">
                {uploading ? <CircularProgress /> : <Button className="AddSongButton uploadButton" color="primary" variant="outlined" onClick={handleFormSubmit}>Begin Upload</Button>}
                </div>
                
                
            </Paper>
        </div>
    )


}

export default UploadSong