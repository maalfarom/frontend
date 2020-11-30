import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

class MediaCard extends React.Component {

  render() {
    return (
      <Fragment>
        <Card style={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              style={{ height: 140 }}
              image="https://lh3.googleusercontent.com/proxy/rtA14wR2bVMsMwPFfvbp6bTAnpAi97DwD41vTYP2AasDtHdGe1epUANX32-MIekMs9wMKHxErc4q9cAnRZPnRJzE5sPsaYkdf3Rfczo8U2-SIpTKMuQljCtPYs0"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.departamento.nombre_departamento}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.departamento.direccion}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                ${this.props.departamento.tarifa}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={(e) => {
              e.preventDefault();
              this.props.dataDepartment({department: this.props.departamento})
            }}>
              Reservar
          </Button>
          </CardActions>
        </Card>
        <br />
      </Fragment>
    );
  }
}

export default MediaCard;
