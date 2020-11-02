import React from "react";
import {useDispatch, useSelector} from "react-redux"
import {removeCurrentSong, previousSong, dropRecentSong} from "../store/actions"


const Controls = (props) =>{
    const dispatch = useDispatch();
    const history = useSelector(state=>state.history)


    const toggle = (e) =>{
        props.setPlaying(!props.playing)
    }

    const handleGoToNextSong = () => {
        dispatch(removeCurrentSong())
    }

    const handleGoToPreviousSong = () => {
        const nextSong = history[1]
        dispatch(dropRecentSong())
        dispatch(previousSong(nextSong));
        
    }

    return (
        <div className="MiniPlayer__Controls MiniPlayer__Section">
            <i onClick={handleGoToPreviousSong} className="fa fa-backward MiniPlayer__ControlIcons"></i>
            {props.playing ? <i onClick={toggle} className="fa fa-pause MiniPlayer__ControlIcons"></i> : <i onClick={toggle} className="fa fa-play MiniPlayer__ControlIcons"></i>}
            <i onClick={handleGoToNextSong} className="fa fa-forward MiniPlayer__ControlIcons"></i>
        </div>
    )
}

export default Controls;