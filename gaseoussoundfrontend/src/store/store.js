import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from "redux-thunk"
import {allPlaylistsReducer, userReducer, errorsReducer, playlistReducer, displayDataReducer, localHistoryReducer} from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({user: userReducer, errors: errorsReducer, playlists: allPlaylistsReducer, currentPlaylist: playlistReducer, displayData: displayDataReducer, history: localHistoryReducer});

const configureStore = initialState => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
};

const store = configureStore({user: null, errors: null})

export default store;