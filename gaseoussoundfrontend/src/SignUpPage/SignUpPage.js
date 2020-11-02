import React, { useEffect, useState } from "react";
import {TextField, Paper, Button} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import DisplayErrors from "../DisplayErrors";
import {signUpThunk, setUser, setErrors} from "../store/actions"
import { useHistory } from "react-router-dom";


const SignUpPage = (props) =>{
    const history = useHistory();
    const user = useSelector(state=>state.user);
    const dispatch = useDispatch();
    let artistNameFromStore ="";
    let emailFromStore="";
    if(user && user.temp && user.temp.artistName){
        artistNameFromStore = user.temp.artistName
    };
    if(user && user.temp && user.temp.email){
        emailFromStore = user.temp.email
    };
    useEffect(()=>{
        dispatch(setUser(null))
    },[])
    useEffect(()=>{
        if(user && user.artistName){
            history.push("/");
        }
    }, [user])

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [artistName, setArtistName] = useState(artistNameFromStore);
    const [email, setEmail] = useState(emailFromStore);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const PROFILEIMAGE = "";


    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleArtistName = (e) => setArtistName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

    const submit = (e) =>{
        const errors = [];
        if(!firstName.length){
            errors.push("First name is required")
        };  if(!lastName.length){
            errors.push("Last name is required")
        };  if(!artistName.length){
            errors.push("Artist name is required")
        };  if(!email.length){
            errors.push("Email is required")
        };  if(!password.length){
            errors.push("Password is required")
        };  if(!(password === confirmPassword)){
            errors.push("Passwords do not match")
        }; 
        if(!(errors.length === 0)){
            dispatch(setErrors({errors: errors}))

        } else{
            signUpThunk(firstName, lastName, artistName, email, password)(dispatch)
        }
    }
    return(
        <div className="SignUpPage__Container" >
        <Paper className="SignUpPage__FormContainer" elevation={2}>
            <div className="SignUpPage__Title">
                <h2>Sign Up</h2>
            </div>
            <div className="errorDiv">
                <DisplayErrors />
            </div>
            <div className="SignUpPage__SignUpForm">
            <TextField
                onChange={handleFirstName} required label="First Name" type="text" value={firstName} margin="dense" id="firstName"
            />
            <TextField
                onChange={handleLastName} required label="Last Name" type="text" value={lastName} margin="dense" id="lastName"
            />
            <TextField
                onChange={handleArtistName} required label="Artist Name" type="text" value={artistName} margin="dense" id="artistName"
            />
            <TextField
                onChange={handleEmail} required label="Email Address" type="email" value={email} margin="dense" id="email"
            />
            <TextField
                onChange={handlePassword} required label="Password" type="password" value={password} margin="dense" id="password"
            />
            <TextField
                onChange={handleConfirmPassword} required label="Confirm Password" type="password" value={confirmPassword} margin="dense" id="confirmPassword"
            />
            </div>
            <div className="SignUpPage__ButtonDiv">
                <div className="spacer"></div>
            <Button onClick={submit} color="primary">
                Sign Up
            </Button>
            </div>
                
        </Paper>
        </div>
    )
}

export default SignUpPage