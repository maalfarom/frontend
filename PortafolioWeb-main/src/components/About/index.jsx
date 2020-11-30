import React, { Fragment } from "react";

import classNames from "classnames";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Datetime from "react-datetime";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);
const dashboardRoutes = [];

export default function WorkSection(props) {
    const classes = useStyles();
    const { ...rest } = props;

    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
        total: 0
    });

    const [checked, setChecked] = React.useState([0]);

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <div style={{backgroundColor: 'white'}}>
            <Header
                color="transparent"
                routes={dashboardRoutes}
                brand="Turismo Real"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
                {...rest}
            />
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <div className={classes.section}>
                        <GridContainer justify="center">
                            <GridItem cs={12} sm={12} md={8}>
                                <h2 className={classes.title}>Reservemos</h2>
                                <hr />
                                <br />
                                <h4 className={classes.description}>
                                    Realiza tu reserva
                                    </h4>
                                <form>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Nombre"
                                                id="name"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Correo"
                                                id="email"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                        <br />
                                        <br />
                                        <GridItem xs={12} sm={12} md={6}>
                                            <InputLabel className={classes.label}>
                                                Fecha y Hora Llegada
                                                </InputLabel>
                                            <br />
                                            <FormControl fullWidth>
                                                <Datetime
                                                    styles={{ color: 'black' }}
                                                    inputProps={{ placeholder: "Selecciona Fecha y Hora" }}
                                                />
                                            </FormControl>
                                        </GridItem>
                                        <br />
                                        <br />
                                        <GridItem xs={12} sm={12} md={6}>
                                            <InputLabel className={classes.label}>
                                                Fecha y Hora Salida
                                                </InputLabel>
                                            <br />
                                            <FormControl fullWidth>
                                                <Datetime
                                                    styles={{ color: 'black' }}
                                                    inputProps={{ placeholder: "Selecciona Fecha y Hora" }}
                                                />
                                            </FormControl>
                                        </GridItem>
                                        <br />
                                        <GridItem>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="age-native-helper">Departamento</InputLabel>
                                                <NativeSelect
                                                    value={state.age}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'age',
                                                        id: 'age-native-helper',
                                                    }}
                                                >
                                                    <option aria-label="None" value="" />
                                                    <option value={10}>Departamento 1</option>
                                                    <option value={20}>Departamento 2</option>
                                                    <option value={30}>Departamento 3</option>
                                                </NativeSelect>
                                                <FormHelperText>Some important helper text</FormHelperText>
                                            </FormControl>
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Cantidad Alojados"
                                                id="numAlojados"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="$Adelanto"
                                                id="adelanto"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>

                                        <h4 className={classes.description} style={{ marginLeft: 40 + '%' }}>
                                            Servicios Extra
                                            </h4>

                                        <GridItem>
                                            <div style={{ marginLeft: 170 }}>
                                                <List className={classes.root}>
                                                    {[0, 1, 2, 3].map((value) => {
                                                        const labelId = `checkbox-list-label-${value}`;

                                                        return (
                                                            <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                                                                <ListItemIcon>
                                                                    <Checkbox
                                                                        edge="start"
                                                                        checked={checked.indexOf(value) !== -1}
                                                                        tabIndex={-1}
                                                                        disableRipple
                                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                                    />
                                                                </ListItemIcon>
                                                                <ListItemText id={labelId} style={{ color: 'black' }} primary={`Line item ${value + 1}`} />
                                                                <ListItemSecondaryAction>
                                                                    <IconButton edge="end" aria-label="comments">
                                                                        <CommentIcon />
                                                                    </IconButton>
                                                                </ListItemSecondaryAction>
                                                            </ListItem>
                                                        );
                                                    })}
                                                </List>
                                            </div>
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={4} style={{ marginLeft: 30 + '%' }}>
                                            <h3 className={classes.description}>Total: ${state.total}</h3>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={4} style={{ marginLeft: 40 + '%' }}>
                                            <Button color="primary">Finalizar</Button>
                                        </GridItem>
                                    </GridContainer>
                                </form>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )

}
