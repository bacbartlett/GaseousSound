import React from "react";
import useMiniPlayer from "./useMiniPlayer";
import Controls from "./Controls";
import Volume from "./Volume";
import Bar from "./Bar";
import AlbumInfo from "./AlbumInfo";
import PlaylistAndLike from "./PlaylistAndLike";

const MiniPlayer = (props) =>{
    const {updateLike, currentTime, length, playing, setPlaying, setClickedTime, makeSetAudioVolume, liked, setLiked} = useMiniPlayer(props.song)
    if(!props.song){
        return null
    }
    return(
        <div className="miniPlayer">
            <audio id="audio" src={props.song.audioUrl}/>
            <Controls setPlaying={setPlaying} playing={playing} />
            <Volume makeSetAudioVolume={makeSetAudioVolume} />
            <Bar setClickedTime={setClickedTime} length={length} currentTime={currentTime} />
            <AlbumInfo title={props.song.title} artistName={props.song.album.artist.artistName} artworkUrl={props.song.album.artworkUrl}/>
            <PlaylistAndLike liked={liked} updateLike={updateLike} />
        </div>
        
    )
    
}

export default MiniPlayer;