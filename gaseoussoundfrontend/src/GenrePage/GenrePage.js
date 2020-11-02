import React from "react";
import {Paper, CircularProgress} from '@material-ui/core';
import SquareDisplay from "./SquareDisplay"


const GenrePage = (props) =>{
    return (
        <>
        <div className="topTitleDiv">
            <h2>Genres</h2>
        </div>
        <div className="GenrePage__Container" >
            <Paper className="GenreDisplay">
                {props.loaded ? (props.displayData.map(el=> <SquareDisplay key={el.title} imageUrl={el.artWork} title={el.title} link={`/genres/${el.id}`} />)) : 
                <CircularProgress />}
            </Paper>
        </div>
        </>
    )
}

export default GenrePage