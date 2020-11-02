import React, { useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

const Volume = (props) =>{
    const [value, setValue] = React.useState(50);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(()=>{
        props.makeSetAudioVolume(document.getElementById("audio"))(value)
    },[value])
    
    return (
        <div className="MiniPlayer__VolumeDiv">
            <VolumeDown />
            <Slider value={value} onChange={handleChange} aria-labelledby="Volume slider" />
            <VolumeUp />
        </div>
        )
}

export default Volume;