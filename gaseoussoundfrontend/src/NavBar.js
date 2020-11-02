import React, {useEffect} from "react";
import NavArea from "./NavArea";
import Search from "./Search"
import {useHistory} from "react-router-dom";
import NavProfile from "./NavProfile";
import { useSelector, useDispatch } from "react-redux";
import NavLoginButton from "./NavLoginButton";
import {restoreUserThunk} from "./store/actions"

const NavBar = (props) =>{
    const history = useHistory();
    const user = useSelector(state=> state.user);
    const dispatch = useDispatch();
  useEffect(()=>{
    if(!user){
      const token = localStorage.getItem("gaseousSoundToken");
      if(token){
        restoreUserThunk(token)(dispatch);
      }
    }
  }, [])
    const goHome = () =>{
        history.push("/")
    }
    const loggedIn = (user && user.artistName)
    return(
        <nav>
            <div className="NavBar__CloudIcon"><i onClick={goHome} style={{color: "#F47C23", fontSize: "45px"}} className="fa fa-cloud"></i></div>
            <NavArea loggedIn={true} specialClass="NavBar__BorderOnLeft" url="/" name="Home" />
            <NavArea loggedIn={true} url="/genres" name="Genres" />
            <NavArea loggedIn={loggedIn} url="/users/playlists" name="My Playlists" />
            <Search />
            <NavArea loggedIn={loggedIn} url="/user/history" name="History" />
            <NavArea loggedIn={loggedIn} url="/upload" name="Upload" />
            {loggedIn ?  <NavProfile artistName={user.artistName} profileImageUrl={user.profileImageUrl} /> : <NavLoginButton />}
            <div></div>
        </nav>
    )
}

export default NavBar