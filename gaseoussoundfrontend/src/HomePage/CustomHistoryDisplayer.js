import React, { useEffect, useState } from 'react';
import {useDispatch} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {addToCurrentPlaylist} from "../store/actions"
import PlayListModelContainer from "../PlaylistModel/PlaylistModelContainer";
import {setDisplayData} from "../store/actions";

const CustomHistoryDisplayer = (props) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setDisplayData([]))
  }, [])

  const [shouldIRender, setShouldIRender] = useState(false);

  useEffect(()=>{
      setShouldIRender(!!props.playlist[0])
  }, [props.playlist])

    const prettyPrint = (num) =>{
        let seconds = num % 60;
        const minutes = num / 60;
        if(seconds < 10){
            seconds = "0" + seconds.toString()
        }
        return `${Math.floor(minutes)}:${seconds}`
    }
    const useStyles = makeStyles({
        table: {
          minWidth: props.width,
        },
      });
  const classes = useStyles();

  const handleMouseOver = (e) =>{
    const image = e.currentTarget.children[0].children[0]
    image.src="/customplay.png"
  }

  const handleMouseLeave =(e) =>{
    const image = e.currentTarget.children[0].children[0]
    image.src=props.playlist[e.currentTarget.id].album.artworkUrl;
  }

  const addSongToCurrentPlaylist = (e) =>{
    const song = props.playlist[e.target.id];
    dispatch(addToCurrentPlaylist(song))
  }

  
  if(!shouldIRender){
      return null
  } else if(props.playlist[0] === undefined){
      return null
  }

  return (
    <>
    <div className="centerSomeText">
    <h5>Recent Listening History</h5>
    </div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {props.playlist.map((row, ind) => (
            <TableRow onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} id={`${ind}`} key={`${row.title}${ind}`}>
              <TableCell> <img id={`${ind}`} onClick={addSongToCurrentPlaylist} className="SongDisplay__AlbumArtwork" src={row.album.artworkUrl}/></TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.album.artist.artistName}</TableCell>
              <TableCell>{prettyPrint(row.length)}</TableCell>
              <TableCell><PlayListModelContainer song={row} songId={row.id} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </>
    
  );
}

export default CustomHistoryDisplayer