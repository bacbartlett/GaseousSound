import React from 'react';
import { useDispatch } from 'react-redux';
import {removeUser} from "./store/actions"



const NavProfile = (props) => {
  const dispatch = useDispatch();


  const handleClick = () =>{
    dispatch(removeUser())
    localStorage.removeItem("gaseousSoundToken")
    return
  }

  return (
    <>
    <div onClick={handleClick} className={`NavBar__NavArea NavBar__NavProfile`} >
      <a onClick={handleClick} className={`NavBar__NavLink`}>{props.artistName}</a>
      <img className="NavBar__ProfileImage" src={props.profileImageUrl} />
    </div>
    
  </>
  );
}

export default NavProfile;