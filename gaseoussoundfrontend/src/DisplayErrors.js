import React from "react";
import MuiAlerts from "@material-ui/lab/Alert";
import {useSelector} from "react-redux";


const DisplayErrors = (props) =>{
    let errors = useSelector(state=>state.errors);
    if(!errors){
        errors = []
    }
    return(
        <>
            {errors.map((el)=>{
                return <MuiAlerts key={el} elevation={4} variant="filled" severity="error">{el}</MuiAlerts>
            })}
        </>
    )
}

export default DisplayErrors;