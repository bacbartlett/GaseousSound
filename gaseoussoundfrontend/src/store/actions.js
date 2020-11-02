import baseUrl from "../Globals/baseUrl";

export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";
export const SET_ERRORS = "SET_ERRORS";
export const ADD_TO_CURRENT_PLAYLIST = "ADD_TO_CURRENT_PLAYLIST";
export const SET_DISPLAY_DATA = "SET_DISPLAY_DATA";
export const REMOVE_CURRENT_SONG = "REMOVE_CURRENT_SONG";
export const ADD_SONG_TO_PLAYLIST = "ADD_SONG_TO_PLAYLIST";
export const ADD_PLAYLIST = "ADD_PLAYLIST";
export const ADD_SONG_TO_CURRENTLY_PLAYING = "ADD_SONG_TO_CURRENTLY_PLAYING";
export const ADD_SONG_TO_LOCAL_HISTORY = "ADD_SONG_TO_LOCAL_HISTORY"
export const NEXT_SONG = "NEXT_SONG";
export const PREVIOUS_SONG = "PREVIOUS_SONG";
export const DROP_RECENT_SONG = "DROP_RECENT_SONG"

export const setUser = (user) => {
    return {type: SET_USER,
        user
    }
}

export const removeUser = () =>{
    return {type: REMOVE_USER
    }
}

export const setErrors = (errors) =>{
    return {type: SET_ERRORS,
        errors
    }
}

export const addToCurrentPlaylist = (song)=>{
    return {type: ADD_TO_CURRENT_PLAYLIST,
        song
    }
}

export const removeCurrentSong = () =>{
    return {type: REMOVE_CURRENT_SONG}
}

export const setDisplayData = (data)=>{
    return{type: SET_DISPLAY_DATA,
    data
    }
}

export const addPlaylist = (playlist)=>{
    return {type: ADD_PLAYLIST,
    playlist
    }
}

export const addSongToEndOfCurrentPlaylist = (song) =>{
    return {type: ADD_SONG_TO_CURRENTLY_PLAYING,
    song
    }
}

export const addSongToLocalHistory = (song) => {
    return {type: ADD_SONG_TO_LOCAL_HISTORY,
    song
    }
}

export const nextSong = () => {
    return {action: NEXT_SONG,
    }
}

export const previousSong = (song) => {
    return {type: PREVIOUS_SONG,
    song}
}

export const dropRecentSong = () => {
    return {type: DROP_RECENT_SONG}
}


export const loginThunk = (email, password) => async (dispatch) =>{
    const res = await fetch(`${baseUrl}/api/session/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    });
    const data = await res.json();
    if(data.messages){
        dispatch(setErrors({errors: data.messages}));
        return;
    }
    const {artistName, token, profileImageUrl} = data;
    localStorage.setItem("gaseousSoundToken", token)
    dispatch(setUser({artistName, token, profileImageUrl}));
    
    const historyRes = await fetch(`${baseUrl}/api/history/getrecent`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({gaseoussoundToken: token})
    });
    const historyData = await historyRes.json();
    historyData.forEach(el=>dispatch(addSongToLocalHistory(el)))


    const playlistRes = await fetch(`${baseUrl}/api/playlists`,
    {method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify({gaseoussoundToken: token})
});
    const playlists = await playlistRes.json();
    if(!playlists){
        return;
    };
    playlists.forEach(el=>dispatch(addPlaylist(el)))

}

export const singupCheckThunk = (email, artistName) => async (dispatch) =>{
    const res = await fetch(`${baseUrl}/api/session/checkforsignup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, artistName})
    });
    const data = await res.json();
    if(data.messages){
        dispatch(setErrors({errors: data.messages}));
        return;
    }
    dispatch(setUser({temp:{artistName, email}}))
}

export const signUpThunk = (fN, lN, aN, e, p) => async (dispatch) =>{
    const res = await fetch(`${baseUrl}/api/session/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({firstName: fN, lastName:lN, artistName:aN, email:e, password:p, profileImageUrl:"https://gaseoussoundphotos.s3.us-east-2.amazonaws.com/profileImages/defaultProfile.png"})
    });
    const data = await res.json();
    if(data.messages){
        dispatch(setErrors({errors: data.messages}));
        return;
    }
    const {artistName, profileImageUrl, token, history} = data;
    localStorage.setItem("gaseousSoundToken", token)
    dispatch(setUser({artistName, profileImageUrl, token}))
}

export const getGenresThunk = () => async(dispatch) =>{
    const res = await fetch(`${baseUrl}/api/genres`);
    const data = await res.json();
    dispatch(setDisplayData(data))
}

export const getGenreSpecificsThunk = (id) => async(dispatch) =>{
    const res = await fetch(`${baseUrl}/api/genres/${id}/albums`);
    const data = await res.json();
    const res2 = await fetch(`${baseUrl}/api/genres/${id}/songs`);
    const data2 = await res2.json();
    dispatch(setDisplayData({albums: data, songs: data2}))
}

export const restoreUserThunk = (token) => async(dispatch)=>{
    const res = await fetch(`${baseUrl}/api/session/restore`,
    {method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify({gaseoussoundToken: token})
});
    const data = await res.json();
    if(!data){
        return;
    }
    const {artistName, newToken, profileImageUrl} = data;
    localStorage.setItem("gaseousSoundToken", newToken)
    dispatch(setUser({artistName, token: newToken, profileImageUrl}));
    
    const historyRes = await fetch(`${baseUrl}/api/history/getrecent`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({gaseoussoundToken: newToken})
    });
    const historyData = await historyRes.json();
    historyData.forEach(el=>dispatch(addSongToLocalHistory(el)))
    
    const playlistRes = await fetch(`${baseUrl}/api/playlists`,
    {method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify({gaseoussoundToken: token})
});
    const playlists = await playlistRes.json();
    if(!playlists){
        return;
    };
    playlists.forEach(el=>dispatch(addPlaylist(el)))
    
}

export const getAlbumInfoThunk = (albumId) => async (dispatch) =>{
    const res = await fetch(`${baseUrl}/api/albums/${albumId}`);
    const data = await res.json();
    dispatch(setDisplayData({album: data}))
}

export const getMyPlaylistsThunk = () => async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/playlists/my`,
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({gaseoussoundToken: localStorage.getItem("gaseousSoundToken")})
    });
    const data = await res.json();
    dispatch(setDisplayData(data));
}

export const getPlaylistSongs = (playlistId) => async (dispatch) =>{
    const res = await fetch(`${baseUrl}/api/playlists/${playlistId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({gaseoussoundToken: localStorage.getItem("gaseousSoundToken")})
    })
    const data = await res.json();
    dispatch(setDisplayData(data))
}


export const getHistoryThunk = () => async (dispatch) =>{
    const res = await fetch(`${baseUrl}/api/history/getall`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({gaseoussoundToken: localStorage.getItem("gaseousSoundToken")})
    })
    const data = await res.json();
    dispatch(setDisplayData(data))
}

