import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import GenrePage from "./GenrePage";
import {getGenresThunk, setDisplayData} from "../store/actions"

const GenrePageContainer = (props) =>{
    const dispatch = useDispatch();
    const displayData = useSelector(state=> state.displayData);

    useEffect(()=>{
        dispatch(setDisplayData("loading"))
        getGenresThunk()(dispatch)
    }, []);
    let loaded;
    if(displayData === "loading" || !displayData || !displayData.map){
        loaded = false;
    } else{
        loaded = true;
    }

    return (
        <div className="GenreDisplay__Background">
            <GenrePage loaded={loaded} displayData={displayData}></GenrePage>
        </div>
    )

}

export default GenrePageContainer