import React from "react";
import {Paper, CircularProgress} from '@material-ui/core';
import SquareDisplay from "../SquareDisplay"



const SpecificGenrePage = (props) =>{
    return (
        <>
        <div className="topTitleDiv">
            <h2>Albums</h2>
        </div>
        <div className="">
            <Paper className="GenreSpecificPage__Albums">
                {props.loaded ? (props.displayData.albums.map(el=> <SquareDisplay key={el.id} imageUrl={el.artworkUrl} title={el.title} link={`/albums/${el.id}`} />)) : 
                <CircularProgress />}
            </Paper>
        </div>
        </>
    )
}

export default SpecificGenrePage