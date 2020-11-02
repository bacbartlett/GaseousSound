import React, { useEffect, useState } from "react";
import baseUrl from "../Globals/baseUrl";
import Carousel from "./Carousel";
import HistoryContainer from "./HistoryContainer";

const Home = (props) =>{

    const [topAlbums, setTopAlbums] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [genreAlbums, setGenreAlbums] = useState([]);
    const [tracksByUser, setTracksByUser] = useState([]);
    const [displayedUser, setDisplayedUser] = useState("");

    const [topLoaded, setTopLoaded] = useState(false);
    const [recLoaded, setRecLoaded] = useState(false);
    const [genLoaded, setGenLoaded] = useState(false);
    const [tuLoaded, setTuLoaded] = useState(false);

    const getTopAlbums = async (updateStateFunc) =>{
        const albumAmoumt = Math.ceil((Math.random() * 17) + 6);
        const albums = [];
        for(let i = 0; i < albumAmoumt; i++){
            const albumId = Math.ceil(Math.random() * 120);
            const res = await fetch(`${baseUrl}/api/albums/${albumId}`);
            const album = await res.json();
            albums.push(album)
        }
        updateStateFunc(albums)
    }

    const getAlbumRecommendations = async(updateStateFunc) =>{
        const albumAmoumt = Math.ceil((Math.random() * 17) + 6);
        const albums = [];
        for(let i = 0; i < albumAmoumt; i++){
            const albumId = Math.ceil(Math.random() * 120);
            const res = await fetch(`${baseUrl}/api/albums/${albumId}`);
            const album = await res.json();
            albums.push(album)
        }
        updateStateFunc(albums)
    }

    const getAlbumsFromGenre = async(updateStateFunc) => {
        const genreId = Math.ceil((Math.random() * 12));
        const res = await fetch(`${baseUrl}/api/genres/3/albums`);
        const genre = await res.json();
        updateStateFunc(genre)

    }

    const getTracksByUser = async(updateStateFunc) => {
        const userId = Math.ceil(Math.random() * 100);
        const res = await fetch(`${baseUrl}/api/users/${userId}/albums`);
        const albums = await res.json();
        updateStateFunc(albums);
        if(albums.length === 0){
            getTracksByUser(updateStateFunc);
        } else{
            setDisplayedUser(albums[0].User.artistName)
        }
    }

    useEffect(()=>{
        setTopLoaded(false);
        setRecLoaded(false);
        setGenLoaded(false);
        setTuLoaded(false);
        getTopAlbums(setTopAlbums);
        getAlbumRecommendations(setRecommendations);
        getAlbumsFromGenre(setGenreAlbums);
        getTracksByUser(setTracksByUser);
    },[])

    useEffect(()=>{
        if(topAlbums && topAlbums[0]){
            setTopLoaded(true)
        }

    }, [topAlbums])
    
    useEffect(()=>{
        if(recommendations && recommendations[0]){
            setRecLoaded(true)
        }

    }, [recommendations])
   
    useEffect(()=>{
        if(genreAlbums && genreAlbums[0]){
            setGenLoaded(true)
        }

    }, [genreAlbums])
    
    useEffect(()=>{
        if(tracksByUser && tracksByUser[0]){
            setTuLoaded(true)
        }

    }, [tracksByUser])
    

    return(
        <main className="HomePage__Container">
            <div className="carosels" >
            <div className="HomePage__Title" >
            <h1>Today's Top Albums</h1>
            </div>
            <Carousel albums={topAlbums} loaded={topLoaded} />
            <div className="HomePage__Title" >
            <h1>Recommended for You</h1>
            </div>
            <Carousel albums={recommendations} loaded={recLoaded} />
            <div className="HomePage__Title" >
            <h1>Explore Ska Music</h1>
            </div>
            <Carousel albums={genreAlbums} loaded={genLoaded} />
            <div className="HomePage__Title" >
            <h1>Tracks By {displayedUser}</h1>
            </div>
            <Carousel albums={tracksByUser} loaded={tuLoaded} />
            </div>
            <div className="Homepage__History">
                <HistoryContainer />
            </div>
        </main>
    )
}

export default Home;