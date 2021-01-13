import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import TabSwitcherLogin from "../TabSwitcherLogin";

const PlaylistAndLike = (props) =>{

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

     const handleClose = () => {
        setOpen(false);
    };
    const loggedInTemp = useSelector(state=>state.user)
    const [loggedIn, setLoggedIn] = useState(loggedInTemp)

    useEffect(()=>{
        setLoggedIn(loggedInTemp)
    }, [loggedInTemp])

    const updateLiked = () =>{
        if(loggedIn){
            props.updateLike(props.liked)
        } else{
            handleClickOpen()
        }
        
    }

    return(
        <div className="MiniPlayer__PlaylistAndLikeDiv">
            {props.liked ? <i onClick={updateLiked} className="fa fa-heart MiniPlayer__HeartRed MiniPlayer__SecondIconSet"></i> : <i onClick={updateLiked} className="fa fa-heart MiniPlayer__SecondIconSet"></i>}
            <i className="fa fa-bars MiniPlayer__SecondIconSet"></i>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <TabSwitcherLogin handleClose={handleClose} />
            </Dialog>
        </div>
    )
}

export default PlaylistAndLike