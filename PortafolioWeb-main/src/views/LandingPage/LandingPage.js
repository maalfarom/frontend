import React, { useState, useEffect, Fragment } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import { DataGrid } from '@material-ui/data-grid';

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import WorkSection from "./Sections/WorkSection.js";
import MediaCard from "components/pruebaLista/lista.js";
import { Link } from "@material-ui/core";
import DepartamentosComponent from "components/pruebaLista/index.jsx";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function LandingPage(props) {

  //States
  const [nextTodoId, setNextTodoId] = useState(0);
  const [newTodoLabel, setNewTodoLabel] = useState("");

  const [departmentData, setDepartmentData] = useState("");

  const [openDialog, setOpenDialog] = React.useState(false);


  const classes = useStyles();
  const { ...rest } = props;

  useEffect(() => {
    console.log('xdd');
  }, []);

  const handleData = (data)=>{    
    console.log(data);
    setDepartmentData(data);
  }

  return (
    <Fragment>

      <div>
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
        <Parallax filter image={require("assets/img/landing-bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Tu Viaje lo Empezamos Juntos.</h1>
                <h4>
                  Realiza tu reservas de nuestros departamentos en cualquier
                  lugar de Chile, de forma Rapida, Simple y Eficaz.
              </h4>
                <br />
                <div style={{ width: 5000+'px' }}>
                  <DepartamentosComponent deparmentData={handleData} />
                </div>
                <br />
                <br />
              </GridItem>
              <GridItem >
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div id='xdd' className={classNames(classes.main, classes.mainRaised)} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
          <div className={classes.container} id="worksection">
            <WorkSection departmentData={setDepartmentData} />
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
}
