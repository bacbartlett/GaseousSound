import React, {useEffect, useState} from "react";
import SongDisplayContainer from "../SongDisplay/SongDisplayContainer"
import {CircularProgress} from '@material-ui/core';
import baseUrl from "../Globals/baseUrl";

const Search = (props) =>{
    const [searchPerm, setSearchPer] = useState(props.match.params.searchTerm)
    const [searchResults, setSearchResults] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [checking, setChecking] = useState(0)

    useEffect(()=>{
        setSearchPer(props.match.params.searchTerm)
        setLoaded(false)
    },[props.match.params.searchTerm])


    useEffect(()=>{
        setChecking(checking + 1)
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
        setChecking(checking + 1)
        if(searchResults.length > 0){
            setLoaded(true)
        }
    }, [searchResults]);

    console.log("Checking:", checking)

    if(loaded === false && checking % 2 === 0 && checking !== 0){
        return(
            <div className="noResults">
            <h2>No Results Found</h2>
            </div>
        )
    }

    return(
        <div className="searchResultsPageContainer">
            {loaded ? <SongDisplayContainer playlist={searchResults} /> : <CircularProgress />}
        </div>
    )
}

export default Search