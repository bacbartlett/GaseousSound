import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";

const Search = (props) =>{
    const [search, setSearch] = useState("");
    const history = useHistory();

    const searchGo = () =>{
        history.push("/search/" + search)
    }

    const searchGoFactory = () =>{
        return searchGo
    }

    const checkIfEnterAndGo = e =>{
        const code = (e.keyCode ? e.keyCode : e.which);
        if(code === 13){
            searchGoFactory()()
        }
    }

    const updateSearch = (e) =>{
        setSearch(e.target.value);
    }

    return(
        <div className="Navbar__SearchBar">
            <div onClick={searchGo} className="NavBar__IconDiv">
                <i style={{"fontSize": "20px"}} className="fa fa-search"></i>
            </div>
            <input id="searchBar" value={search} onChange={updateSearch} onKeyPress={checkIfEnterAndGo} className="NavBar__SearchInput"></input>
        </div>
    )
}

export default Search;