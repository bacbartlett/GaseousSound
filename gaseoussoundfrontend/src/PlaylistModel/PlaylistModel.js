import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import baseUrl from "../Globals/baseUrl";
import {useSelector, useDispatch} from "react-redux";
import {addSongToEndOfCurrentPlaylist , addPlaylist as createNewAddPlaylistAction} from "../store/actions"

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const [addingNewPlaylist, setAddingNewPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const handleUpdateOnInput = (e) => setNewPlaylistName(e.target.value)

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleAddingNewPlaylist = async() =>{
    if(!addingNewPlaylist){
      setAddingNewPlaylist(true)
    } else{
      const token = localStorage.getItem("gaseousSoundToken");
            if(!token){
                return 
            };
      const newPlaylistRes = await fetch(`${baseUrl}/api/playlists/newPlaylist`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({gaseoussoundToken: token, title: newPlaylistName})
      });

      const newPlaylist = await newPlaylistRes.json();
      dispatch(createNewAddPlaylistAction(newPlaylist));
      onClose("")
    }
  }

  if(!props.playlists){
      return null
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="Playlists" open={open}>
      <DialogTitle id="Playlists">My Playlists</DialogTitle>
      <List>
      <ListItem button onClick={() => handleListItemClick("currentlyPlaying")} key={0}>
            <ListItemText primary={"Add to Currently Playing"} />
          </ListItem>
        {props.playlists.map((el) => (
          <ListItem button onClick={() => handleListItemClick(el.id.toString())} key={el.id}>
            <ListItemText primary={"Add to " + el.title} />
          </ListItem>
        ))}
        

        <ListItem autoFocus button onClick={() => handleAddingNewPlaylist()}>
        <i className="SongDisplay__Icon fa fa-plus"></i>
          {addingNewPlaylist ? <input autoFocus onChange={handleUpdateOnInput} value={newPlaylistName} /> : <ListItemText primary="New Playlist" />}
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const PlusButtonForPlaylist = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => {
    setSelectedValue("")
    setOpen(true);
  };

  const handleClose = async(value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  useEffect(()=>{
    const addSongToPlaylist = async () =>{
      let token;
      if(!user || !user.token){
        return
      }
      token = user.token;
      const playlistId = selectedValue;
      const songId = props.songId;
      if(!playlistId || playlistId === ""){
        return;
      }
      if(playlistId === "currentlyPlaying"){
        dispatch(addSongToEndOfCurrentPlaylist(props.song));
        return;
      }
      const res= await fetch(`${baseUrl}/api/playlists/${playlistId}/${songId}`,  {method: "POST",
      headers:{
          "Content-Type": "application/json"
      },
      body: JSON.stringify({gaseoussoundToken: token})
    });
    const text = await res.text();
  }
    addSongToPlaylist();
  }, [selectedValue])

  return (
      <>
      <div onClick={handleClickOpen}>
          <i  id={`${props.ind}`} className="SongDisplay__Icon fa fa-plus"></i>
        </div>
          <SimpleDialog songId={props.songId} playlists={props.playlists} selectedValue={selectedValue} open={open} onClose={handleClose} />
      </>
    
  );
}

export default PlusButtonForPlaylist;