import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DisplayErrors from "./DisplayErrors";
import { useDispatch, useSelector } from "react-redux";
import {singupCheckThunk} from "./store/actions"
import { useHistory } from "react-router-dom";


const SignUp = (props) =>{
    const {handleClose} = props;
    const history = useHistory()
    const [artistName, setArtistName] = useState("");
    const [email, setEmail] = useState("");
    const handleArtistName = (e) => setArtistName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const dispatch = useDispatch()
    const handleSignUp = () =>{
        singupCheckThunk(email, artistName)(dispatch)
    }
    const user = useSelector(state=>state.user);
    useEffect(()=>{
        if(user && user.temp){
            history.push("/signup");
            handleClose();
        }
    },[user])



return (
        <>
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <DisplayErrors />
            <DialogContent>
            <TextField
                onChange={handleEmail}
                value={email}
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
            />
            <TextField
                onChange={handleArtistName}
                type={email}
                margin="dense"
                id="artistName"
                label="Artist Name"
                type="artistName"
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSignUp} color="primary">
                Sign Up
            </Button>
            </DialogActions>
        </>
    )
}

export default SignUp;