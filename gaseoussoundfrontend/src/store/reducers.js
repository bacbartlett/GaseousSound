import {REMOVE_USER, PREVIOUS_SONG, DROP_RECENT_SONG, ADD_SONG_TO_LOCAL_HISTORY, SET_USER, SET_ERRORS, ADD_TO_CURRENT_PLAYLIST, SET_DISPLAY_DATA, REMOVE_CURRENT_SONG, ADD_PLAYLIST, ADD_SONG_TO_CURRENTLY_PLAYING} from "./actions";


export const userReducer = (state = null, action) =>{
    switch (action.type){
        case SET_USER: {
            const newState = action.user;
            return newState;
        }
        case REMOVE_USER: {
            return null;
        }
        default:{
            return state
        }
    }
}

export const errorsReducer = (state = null, action) =>{
    switch(action.type){
        case SET_ERRORS: {
            const newState = action.errors.errors;
            return newState;
        }
        default:{
            return null
        }
    }
}

export const playlistReducer = (state = [], action) =>{
    switch(action.type){
        case ADD_TO_CURRENT_PLAYLIST:{
            const newState = [...state];
            newState[0] = (action.song);
            return newState;
        }
        case REMOVE_CURRENT_SONG:{
            const newState = [...state];
            if(newState.length === 1){
                return []
            }
            newState.shift();
            return newState;
        }
        case ADD_SONG_TO_CURRENTLY_PLAYING:{
            const newState = [...state];
            newState.push(action.song);
            return newState;
        }
        case PREVIOUS_SONG: {
            const newState = [...state];
            newState.unshift(action.song);
            return newState;
        }
        default: return state;
    }
}

export const displayDataReducer = (state = null, action) =>{
    switch(action.type){
        case SET_DISPLAY_DATA:{
            return action.data
        }
        default:{
            return state
        }
    }
}

export const allPlaylistsReducer = (state = [], action) =>{
    switch(action.type){
        case ADD_PLAYLIST:{
            const newState = [...state];
            newState.push(action.playlist);
            return newState;
        } default: {
            return state;
        }
    }
}

export const localHistoryReducer = (state = [], action) =>{
    switch(action.type){
        case ADD_SONG_TO_LOCAL_HISTORY:{
            const newState = [...state];
            if(newState.length > 2){
                newState.pop();
            }
            newState.unshift(action.song);
            return newState
        }
        case DROP_RECENT_SONG:{
            const newState = [...state];
            newState.shift();
            newState.shift();
            return newState;
        }
        default: {
            return state;
        }
    }
}