import React from "react";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import TabSwitcherLogin from "./TabSwitcherLogin"


//takes props.url and props.name

const NavArea = (props) =>{
    const specialClass = props.specialClass || "";
    const history = useHistory();
    const handleClick = (e) =>{
        if(props.loggedIn){
            history.push(props.url)
        } else{
            handleClickOpen();
        }
        
    }
    const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const handleClickOpen = () => {
        setOpen(true);
    };

     const handleClose = () => {
        setOpen(false);
    };


    return(
        <>
        <div onClick={handleClick} className={`NavBar__NavArea ${specialClass}`}>
            <a onClick={handleClick} className={`NavBar__NavLink`}>{props.name}</a>
        </div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <TabSwitcherLogin handleClose={handleClose} />
        </Dialog>
        </>
    )
}

export default NavArea;