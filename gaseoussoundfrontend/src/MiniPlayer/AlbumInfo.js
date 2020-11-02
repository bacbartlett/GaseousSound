import React from "react";

const AlbumInfo = (props) =>{
    return (
        <div className="MiniPlayer__Section MiniPlayer__AlbumInfo">
            <div className="MiniPlayer__albumImageDiv">
                <img className="MiniPlayer__albumImage"src={props.artworkUrl} />
            </div>
            <div className="MiniPlayer__infoDiv">
            <div className="MiniPlayer__songTitleDiv">
                {props.title}
            </div>
            <div className="MiniPlayer__artistNameDiv">
                {props.artistName}
            </div>
            </div>

        </div>
    )
}

export default AlbumInfo