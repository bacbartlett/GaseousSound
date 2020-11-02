import React, { useEffect } from "react";

const PlaylistAndLike = (props) =>{

    const updateLiked = () =>{
        props.updateLike(props.liked)
    }

    return(
        <div className="MiniPlayer__PlaylistAndLikeDiv">
            {props.liked ? <i onClick={updateLiked} className="fa fa-heart MiniPlayer__HeartRed MiniPlayer__SecondIconSet"></i> : <i onClick={updateLiked} className="fa fa-heart MiniPlayer__SecondIconSet"></i>}
            <i className="fa fa-bars MiniPlayer__SecondIconSet"></i>
        </div>
    )
}

export default PlaylistAndLike