import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getGenreSpecificsThunk, setDisplayData} from "../../store/actions";
import SpecificGenrePage from "./SpecificGenrePage";

const SpecificGenrePageContainer = (props) =>{
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const displayData = useSelector(state=>state.displayData)
    const id = props.match.params.genreId;
    
    useEffect(()=>{
        dispatch(setDisplayData("loading"));
        getGenreSpecificsThunk(id)(dispatch)
    },[])

    useEffect(()=>{
        if(displayData === "loading" || !displayData || !displayData.albums || !displayData.albums.map){
            setLoaded(false)
        } else{
            setLoaded(true)
        }
    }, [displayData]);

    return (
        <div className="SpecificGenrePageDiv">
            <SpecificGenrePage loaded={loaded} displayData={displayData} />
        </div>
    )
}

export default SpecificGenrePageContainer