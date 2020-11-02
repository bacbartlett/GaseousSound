import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import NavArea from './NavArea';
import {useLocation} from "react-router-dom";
import TabSwitcherLogin from "./TabSwitcherLogin"

const NavLoginButton = (props) => {
    const location = useLocation();
  return (
    <div>
      <NavArea loggedIn={false} url={location.pathname} name={"Login/Sign Up"} />
    </div>
  );
}

export default NavLoginButton;