import {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import baseUrl from "../Globals/baseUrl";
import {removeCurrentSong, addSongToLocalHistory} from "../store/actions"

const useMiniPlayer = (song) =>{
    const dispatch = useDispatch();

    if(!song){
        song = song = {title: "Monotony", length: 185, liked: true, audioUrl:"https://gaseoussoundaudio.s3.us-east-2.amazonaws.com/1.mp3", lyrics: null, album: {title: "Modern Times", artworkUrl: "https://gaseoussoundphotos.s3.us-east-2.amazonaws.com/profileImages/2.jpg", artist: {artistName: "Dee Yan-Key"}}}
    }
    const [length, setLegth] = useState(song.length);
    const [currentTime, setCurrentTime] = useState();
    const [playing, setPlaying] = useState(true);
    const [clickedTime, setClickedTime] = useState(0);
    const [liked, setLiked] = useState(false);

    const makeSetAudioVolume = (audio) => (num) =>{
        audio.volume = num/100
    }


    useEffect(()=>{
        const audio = document.getElementById("audio");
        if(!audio){
            return
        }

        const setAudioData = () =>{
            setLegth(audio.duration);
            setCurrentTime(audio.currentTime);
        }

        const setAudioTime = () => setCurrentTime(audio.currentTime);

        audio.addEventListener("loadeddata", setAudioData);
        audio.addEventListener("timeupdate", setAudioTime);
        audio.onended = ()=> dispatch(removeCurrentSong());

        if(playing){
            audio.play();
        } else{
            audio.pause()
        };

        if (clickedTime && clickedTime !== currentTime) {
            audio.currentTime = clickedTime;
            setClickedTime(null);
          } 

        return ()=>{
            audio.removeEventListener("loadeddata", setAudioData);
            audio.removeEventListener("timeupdate", setAudioTime);
        }
    });

    useEffect(()=>{
        const addSongToRemoteHistory = async(song) =>{
            const token = localStorage.getItem("gaseousSoundToken");
            if(!token){
                return 
            };
            const res = await fetch(`${baseUrl}/api/history/${song.id}`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({gaseoussoundToken: token})
            });
            const data = await res.json();
        }

        const checkLike = async(song) =>{
            const token = localStorage.getItem("gaseousSoundToken");
            if(!token){
                return 
            };
            const res = await fetch(`${baseUrl}/api/likes/${song.id}`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({gaseoussoundToken: token})
            });
            const data = await res.json();
            setLiked(data.likeStatus);
            console.log(data.likeStatus, "This is the like")
        }


        const audio = document.getElementById("audio");
        if(!audio){
            return
        }

        const setAudioData = () =>{
            setLegth(audio.duration);
            setCurrentTime(0);
        }
        audio.currentTime = 0;
        const setAudioTime = () => setCurrentTime(audio.currentTime);

        audio.addEventListener("loadeddata", setAudioData);
        audio.addEventListener("timeupdate", setAudioTime);

        if(playing){
            audio.play();
        } else{
            audio.pause()
        };

        if (clickedTime && clickedTime !== currentTime) {
            audio.currentTime = clickedTime;
            setClickedTime(null);
          } 

        dispatch(addSongToLocalHistory(song))
        addSongToRemoteHistory(song)
        checkLike(song);

        return ()=>{
            audio.removeEventListener("loadeddata", setAudioData);
            audio.removeEventListener("timeupdate", setAudioTime);
        }
    }, [song]);

    const updateLike = async(currentState) =>{
        let type;
        if(currentState){
            type = "DELETE"
        } else{
            type = "PUT"
        }

        const token = localStorage.getItem("gaseousSoundToken");
            if(!token){
                return 
            };
            const res = await fetch(`${baseUrl}/api/likes/${song.id}`,{
                method: type,
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({gaseoussoundToken: token})
            });
            const data = await res.json();
            setLiked(data.likeStatus);
            console.log(data.likeStatus, "This is the like")
    }

    return{
        currentTime,
        length,
        playing,
        setPlaying,
        setClickedTime,
        makeSetAudioVolume,
        setLiked,
        liked,
        updateLike
    }
}

export default useMiniPlayer;