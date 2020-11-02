import React, {useEffect, useState} from "react";
import SongDisplayContainer from "../SongDisplay/SongDisplayContainer"
import {CircularProgress} from '@material-ui/core';
import baseUrl from "../Globals/baseUrl";

const Search = (props) =>{
    const [searchPerm, setSearchPer] = useState(props.match.params.searchTerm)
    const [searchResults, setSearchResults] = useState([]);
    const [loaded, setLoaded] = useState(false);


    useEffect(()=>{
        const getData = async () =>{
            const res = await fetch(`${baseUrl}/api/search/${props.match.params.searchTerm}`);
            const data = await res.json();
            const formattedData = data.map(el=> {
                el.album.artist = {artistName: el.Album.User.artistName};
                return el
            })
            setSearchResults(formattedData);
        }
        getData();
    }, [searchPerm])

    useEffect(()=>{
        console.log(searchResults)
        if(searchResults.length > 0){
            setLoaded(true)
        }
    }, [searchResults]);

    return(
        <div className="searchResultsPageContainer">
            {loaded ? <SongDisplayContainer playlist={searchResults} /> : <CircularProgress />}
        </div>
    )
}

export default Search