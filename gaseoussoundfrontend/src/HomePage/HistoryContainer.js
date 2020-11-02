import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import History from "./History"

const HistoryContainer = (props) =>{

    const [recentHistory, setRecentHistory] = useState([])
    const historySlice = useSelector(state=>state.history)

    useEffect(()=>{
        setRecentHistory(historySlice)
    }, [historySlice])

    return <History recentHistory={recentHistory} />
}

export default HistoryContainer