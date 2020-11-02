import React from "react";

const Length = (props) =>{
    const convertToNiceTime = num =>{
        if(!num){
            return "0:00"
        }
        num = Math.floor(num);
        let seconds = num % 60;
        if(seconds < 10){
            seconds = `0${Math.floor(seconds)}`
        } else{
            seconds = Math.floor(seconds)
        }
        const minutes = (num /60);
        return `${Math.floor(minutes)}:${seconds}`
    }
    return <div className="MiniPlayer__Length">{`${convertToNiceTime(props.currentTime)}/${convertToNiceTime(props.length)}`}</div>
}
export default Length