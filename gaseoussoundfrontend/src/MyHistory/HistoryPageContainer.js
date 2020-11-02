import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HistoryPage from "./HistoryPage";
import {setDisplayData, getHistoryThunk} from "../store/actions"

const HistoryPageContainer = (props) =>{
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [myHistory, setMyHistory] = useState([])
    const displayData = useSelector(state=>state.displayData)

    useEffect(()=>{
        dispatch(setDisplayData("loading"));
        setLoaded(false);
        setMyHistory([])
        getHistoryThunk()(dispatch)
    }, []);

    useEffect(()=>{
        if(displayData && displayData[0] && displayData[0].Song && displayData[0].Song.Album)
        setMyHistory(displayData);
        setLoaded(true);
    }, [displayData])


    return <HistoryPage myHistory={myHistory} loaded={loaded} />
}

export default HistoryPageContainer