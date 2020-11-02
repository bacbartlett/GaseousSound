import React from "react";
import { useHistory } from "react-router-dom";

const Album = (props) => {
    const history = useHistory();
    const goToAlbum = () =>{
        history.push(`/albums/${props.albumId}`)
    }

    return(
        <div onClick={goToAlbum} className="albumContainer">
            <div style={{backgroundImage: `url(${props.albumArtwork})`}} className="album"></div>
            <h3 className="Homepage__albumtitle">{props.title}</h3>
        </div>
    )
}

export default Album;