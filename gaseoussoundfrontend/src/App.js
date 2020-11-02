import React, { useEffect } from 'react';
import NavBar from "./NavBar";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./HomePage/Home"
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from "./store/store"
import SignUpPage from './SignUpPage/SignUpPage';
import MiniPlayerContainer from "./MiniPlayer/MiniPlayerContainer";
import GenrePageContainer from './GenrePage/GenrePageContainer';
import SpecificGenrePageContainer from './GenrePage/SpecificGenrePage/SpecificGenrePageContainer';
import AlbumPageContainer from "./AlbumPage/AlbumPageContainer";
import MyPlaylistPageContainer from "./MyPlaylistPage/MyPlaylistPageContainer"
import SpecificPlaylistPageContainer from "./MyPlaylistPage/SpecificPlaylist/SpecificPlaylistContainer"
import HistoryPageContainer from "./MyHistory/HistoryPageContainer";
import UploadSong from "./UploadSong/UploadSong"
import Footer from "./HomePage/footer"
import Search from './Search/Search';

function App() {


  return (
    <Provider store={store}>
      <main>
      <BrowserRouter>
          <NavBar />
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signup">
            <SignUpPage />
          </Route>
          <Route exact path="/genres">
            <GenrePageContainer />
          </Route>
          <Route exact path="/upload" component={UploadSong} />
          <Route exact path="/genres/:genreId" component={SpecificGenrePageContainer} />
          <Route exact path="/albums/:albumId" component={AlbumPageContainer} />
          <Route exact path="/users/playlists" component={MyPlaylistPageContainer} />
          <Route exact path="/users/playlists/:playlistId" component={SpecificPlaylistPageContainer} />
          <Route exact path="/user/history" component={HistoryPageContainer} />
          <Route exact path="/search/:searchTerm" component={Search} />
      </BrowserRouter>
      </main>
      <Footer />
      <MiniPlayerContainer />
    </Provider>
    
  );
}

export default App;
