import React, {useState, useEffect} from "react";
import Album from "./Album";
import {CircularProgress} from '@material-ui/core';

const Carousel = (props) =>{
    const [index, setIndex] = useState(0);

    const dispalyedAlbums = props.albums.slice((index * 4), ((index + 1) * 4));

    const updateIndex = (num) => {
        let newIndex = index + num;
        if(newIndex < 0){
            newIndex = 0;
        } else if(newIndex > Math.ceil(props.albums.length / 4) - 1){
            newIndex = Math.ceil(props.albums.length / 4) - 1;
        }
        setIndex(newIndex);
    }  

    const handleRightArrowClick = (e) =>{
        updateIndex(1);
    }

    const handleLeftArrowClick = (e) =>{
        updateIndex(-1);
    }

    return(
        <div className="carouselContainer">
            <div className="carousel">
                <div className="arrow-container left-arrow-container">
                    <i onClick={handleLeftArrowClick} className="fa fa-arrow-circle-left carousel__arrow"></i>
                </div>
                {props.loaded ? dispalyedAlbums.map((el,ind) => {
                    return <Album key={ind.toString()+el.artworkUrl} albumId={el.id} title={el.title} albumArtwork={el.artworkUrl}/>
                }): <CircularProgress />}
                <div className="arrow-container right-arrow-container">
                    <i onClick={handleRightArrowClick} className="fa fa-arrow-circle-right carousel__arrow"></i>
                </div>
            </div>
        </div>
    )
}

export default Carousel;