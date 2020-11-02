import React, {useState} from "react";
import { useHistory } from "react-router-dom";

const Search = (props) =>{
    const [search, setSearch] = useState("");
    const history = useHistory();

    const searchGo = () =>{
        history.push("/search/" + search)
    }

    const updateSearch = (e) =>{setSearch(e.target.value);}

    return(
        <div className="Navbar__SearchBar">
            <div onClick={searchGo} className="NavBar__IconDiv">
                <i style={{"fontSize": "20px"}} className="fa fa-search"></i>
            </div>
            <input value={search} onChange={updateSearch} className="NavBar__SearchInput"></input>
        </div>
    )
}

export default Search;