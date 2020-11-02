import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {loginThunk} from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
import DisplayErrors from "./DisplayErrors";


const LoginTab = (props) =>{
    const {handleClose} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleLogin = (e) =>{
        loginThunk(email, password)(dispatch)
    }
    useEffect(() => {
        if(user){
            handleClose();
        };
    }, [user])

    const demoUser = ()=>{
        setEmail("demoUser@example.com");
        setPassword("password");
        return
    }


return (
        <>
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
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
                onChange={handlePassword}
                value={password}
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={demoUser} color="primary">
                Demo User
            </Button>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleLogin} color="primary">
                Login
            </Button>
            </DialogActions>
        </>
    )
}

export default LoginTab;