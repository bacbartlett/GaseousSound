import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 230,
  },
  media: {
    height: 345,
  },
});

export default function SquareDisplay(props) {
  const classes = useStyles();
    const history = useHistory();
    
  const handleClick = () => {
    history.push(props.link)
  }

  return (
    <Card onClick={handleClick} className="SquareDisplay">
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.imageUrl}
          title="Genre"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
        </ CardContent>
      </CardActionArea>
    </Card>
  );
}