import React, { Fragment } from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Datetime from "react-datetime";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import customInputStyle from './stylesCustom';
import { Checkbox, IconButton, ListItemIcon, ListItemSecondaryAction, ListItemText } from "@material-ui/core";

var moment = require('moment');
moment().format();

const URL = 'http://localhost:3300/';

class WorkSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: '',
      extraServices: [],
      extraServicesList: [],
      departments: [],
      departmentsList: [],
      regions: [],
      communes: [],
      provinces: [],
      checked: 0,

      department: '',
      names: '',
      surnames: '',
      email: '',
      phone: '',
      rut: '',
      region: '',
      commune: '',
      province: '',
      hourFrom: '',
      dateFrom: '',
      dateUntil: '',
      rDateFrom: '',
      rDateUntil: '',
      advancePayment: 0,
      numberGuests: 0,
      total: 0,

      mDepartment: '',
      mNames: '',
      mSurnames: '',
      mEmail: '',
      mPhone: '',
      mRut: '',
      mRegion: '',
      mCommune: '',
      mProvince: '',
      mDateFrom: '',
      mDateUntil: '',
      mAdvancePayment: 0,
      mNumberGuests: 0,
      mTotal: 0,

      departamentoElegido: props.departmentData,

      provinceDisabled: true,
      communeDisabled: true
    }

    console.log(props.departmentData);
    console.log(this.state.department);

    this.handleNamesChange = this.handleNamesChange.bind(this);
    this.handleSurnamesChange = this.handleSurnamesChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleRutChange = this.handleRutChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleNumberGuestsChange = this.handleNumberGuestsChange.bind(this);
    this.handleAdvancePaymentChange = this.handleAdvancePaymentChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
    this.handleCommuneChange = this.handleCommuneChange.bind(this);
    this.handleDateFromChange = this.handleDateFromChange.bind(this);
    this.handleDateUntilChange = this.handleDateUntilChange.bind(this);
  }


  componentDidMount() {
    this.getDepartments();
    this.getRegions();
  }

  getDepartments() {
    let endpoint = `${URL}departamentos`;

    fetch(endpoint, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ departmentsList: data });
      });
  }

  getRegions() {
    let endpoint = `${URL}regiones`;

    fetch(endpoint, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ regions: data });
      });
  }

  getCommunes(idProvincia) {
    let endpoint = `${URL}comunas`;

    let json = JSON.stringify(`{"id": ${idProvincia}}`);
    console.log(json);

    fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.parse(json) })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ communes: data });
      });
  }

  getProvinces(idRegion) {
    let endpoint = `${URL}provincias`;

    let json = JSON.stringify(`{"id": ${idRegion}}`);
    console.log(json);
    fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.parse(json) })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ provinces: data });
      });
  }

  getExtraServicesByIdDepartment(idDepartment) {
    let endpoint = `${URL}serviciosextras`

    let json = JSON.stringify(`{"id": ${idDepartment}}`);
    console.log(json);

    fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.parse(json) })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ extraServicesList: data });
      })
  }

  searchDepartmentByCommune(idCommune) {
    let endpoint = `${URL}departamento/comuna`

    let json = JSON.stringify(`{"id": ${idCommune}}`);
    console.log(json);

    fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.parse(json) })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ departmentsList: data })
      })
  }

  saveBooking(idCliente) {
    let endpoint = `${URL}reserva`;

    let json = `{
      "horaLlegada": "${this.state.hourFrom.toString()}",
      "total": ${Number.parseInt(this.state.total)},
      "idCliente": ${Number.parseInt(idCliente)},
      "idDepartamento": ${Number.parseInt(this.props.departmentData.department.id_departamento)},
      "fechaInicio": "${this.state.rDateFrom.toString()}",
      "fechaTermino": "${this.state.rDateUntil.toString()}",
      "acompaniantes": ${Number.parseInt(this.state.numberGuests)},
      "adelanto": ${Number.parseInt(this.state.advancePayment)}
    }`

    json = JSON.stringify(json);

    console.log(json);

    json = JSON.parse(json);

    fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: json })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log('Erro en POST BOOKING:: ', err));
  }

  saveClient() {
    let endpoint = `${URL}cliente`;

    let pNombre, sNombre, pApellido, sApellido;

    if (this.state.names.includes(' ')) {
      pNombre = this.state.names.slice(0, this.state.names.indexOf(' '));
      sNombre = this.state.names.slice(this.state.names.indexOf(' '), this.state.names.length);
      pNombre = pNombre.replace(' ', '');
      sNombre = sNombre.replace(' ', '');
    } else {
      console.log('AQUI');
      pNombre = this.state.names.slice(0, this.state.names.length);
      pNombre = pNombre.replace(' ', '');
    }

    if (this.state.surnames.includes(' ')) {
      pApellido = this.state.surnames.slice(0, this.state.surnames.indexOf(' '));
      sApellido = this.state.surnames.slice(this.state.surnames.indexOf(' '), this.state.surnames.length);
      pApellido = pApellido.replace(' ', '');
      sApellido = sApellido.replace(' ', '');
    } else {
      pApellido = this.state.surnames.slice(0, this.state.surnames.length);
      pApellido = pApellido.replace(' ', '');

    }

    let json = `{
      "rut": "${this.state.rut.toString()}",
      "pNombre": "${pNombre}",
      "sNombre": "${sNombre || ''}" ,
      "pApellido": "${pApellido}",
      "sApellido": "${sApellido || ''}",
      "email": "${this.state.email.toString()}",
      "telefono": ${Number.parseInt(this.state.phone)}
    }`

    json = JSON.stringify(json);

    console.log(json);

    json = JSON.parse(json);

    fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: json })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.ok) {
          this.saveBooking(data.id);
        }
      })
      .catch(err => console.log('Erro en POST CLIENTE: ', err));
  }

  handleNamesChange(e) {
    this.setState({ names: e.target.value });
  };

  handleRutChange(e) {
    this.setState({ rut: e.target.value });
  };

  handleSurnamesChange(e) {
    this.setState({ surnames: e.target.value });
  };

  handleAdvancePaymentChange(e) {
    this.setState({ advancePayment: e.target.value });
  };

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  };

  handleNumberGuestsChange(e) {
    this.setState({ numberGuests: e.target.value });
  };

  handlePhoneChange(e) {
    this.setState({ phone: e.target.value });
  };

  handleDepartmentChange(e) {
    console.log(e.target.value);
    this.setState({ department: e.target.value }, () => {
      this.setState({ total: this.state.department.tarifa });
      this.getExtraServicesByIdDepartment(this.state.department);
    });
  }

  handleRegionChange(e) {
    this.setState({ region: e.target.value, communes: [], provinceDisabled: false, communeDisabled: true }, () => {
      this.getProvinces(this.state.region);
    });
  }

  handleProvinceChange(e) {
    this.setState({ province: e.target.value, communeDisabled: false }, () => {
      this.getCommunes(this.state.province);
    });
  }

  handleCommuneChange(e) {
    this.setState({ commune: e.target.value });
  }

  handleDateFromChange(e) {
    console.log(e._d);
    let date = new Date(e._d);
    let hour = `${date.getHours()}:${date.getMinutes()}`;

    let formatDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    this.setState({ dateFrom: formatDate, hourFrom: hour, rDateFrom: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear().toString().substring(2)}` }, () => {
      console.log(this.state.dateFrom);
    });
  }

  handleDateUntilChange(e) {
    console.log(e._d);
    let date = new Date(e._d);
    let formatDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    let totalDays = 0;

    let fecha1 = moment(this.state.dateFrom);
    let fecha2 = moment(formatDate);

    console.log(fecha1);
    console.log(fecha2);

    console.log(fecha2.diff(fecha1, 'days'));

    totalDays = fecha2.diff(fecha1, 'days');

    totalDays = totalDays == 0 ? 1 : totalDays;

    console.log(this.props.departmentData.department.tarifa);
    console.log('totaldays:'+totalDays);

    this.setState({ dateUntil: formatDate, daysLodging: totalDays, total: this.props.departmentData.department.tarifa * totalDays, rDateUntil: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear().toString().substring(2)}` });
  }

  //Validar Formulario  
  validation() {
    const { department,
      names,
      surnames,
      email,
      phone,
      rut,
      dateFrom,
      dateUntil,
      advancePayment,
      numberGuests
      } = this.state;

    let valid = true;

    console.log(this.state);

    if (names !== null && names !== '') {
      this.setState({ mNames: '' });
    } else {
      valid = false;
    }

    if (surnames !== null && surnames !== '') {
      this.setState({ mSurnames: '' });
    } else {
      valid = false;
    }

    if (email !== null && email !== '') {
      this.setState({ mEmail: '' });
    } else {
      valid = false;
    }

    if (phone !== null && phone !== '') {
      this.setState({ mPhone: '' });
    } else {
      valid = false;
    }

    if (rut !== null && surnames !== '') {
      this.setState({ mRut: '' });
    } else {
      valid = false;
    }

    if (dateFrom !== null && dateFrom !== '') {
      this.setState({ mDateForm: '' });
    } else {
      valid = false;
    }

    if (dateUntil !== null && dateUntil !== '') {
      this.setState({ mDateUntil: '' });
    } else {
      valid = false;
    }

    if(!valid){alert("Formulario Invalido, revise los campos")}

    console.log(valid);

    return valid;
  }


  render() {
    return (
      <Fragment>
        {this.props.departmentData ? (
          <div style={{ padding: 70 + 'px 0' }}>
            <div style={{ color: "black" }}>{JSON.stringify(this.props.departmentData)}</div>
            <GridContainer justify="center">
              <GridItem cs={12} sm={12} md={8}>
                <h2 style={{ color: 'black', textAlign: 'center' }}>Reservemos</h2>
                <hr />
                <br />
                <h4 style={{ color: 'gray', textAlign: 'center' }}>
                  Realiza tu reserva
              </h4>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  console.log('OLAAAAAAAAAA');
                }}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField id="standard-basic" label="Nombres" onChange={this.handleNamesChange} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField id="standard-basic" label="Apellidos" onChange={this.handleSurnamesChange} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField id="standard-basic" label="RUT" onChange={this.handleRutChange} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField id="standard-basic" label="Telefono" onChange={this.handlePhoneChange} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField id="standard-basic" label="Correo" onChange={this.handleEmailChange} />
                      <br />
                      <br />
                    </GridItem>
                    <GridItem>
                      <InputLabel style={{
                        cursor: "pointer",
                        paddingLeft: "0",
                        color: "rgba(0, 0, 0, 0.26)",
                        fontSize: "14px",
                        lineHeight: "1.428571429",
                        fontWeight: "400",
                        display: "inline-flex",

                      }}>
                        Fecha y Hora Llegada
                  </InputLabel>
                      <br />
                      <FormControl fullWidth>
                        <Datetime
                          closeOnSelect={true}
                          styles={{ color: 'black' }}
                          inputProps={{ placeholder: "Selecciona Fecha y Hora" }}
                          onChange={this.handleDateFromChange}
                        />
                      </FormControl>
                      <br />
                      <br />
                    </GridItem>
                    <GridItem>
                      <InputLabel style={{
                        cursor: "pointer",
                        paddingLeft: "0",
                        color: "rgba(0, 0, 0, 0.26)",
                        fontSize: "14px",
                        lineHeight: "1.428571429",
                        fontWeight: "400",
                        display: "inline-flex"
                      }}>
                        Fecha y Hora Salida
                </InputLabel>
                      <br />
                      <FormControl fullWidth>
                        <Datetime
                          closeOnSelect={true}
                          styles={{ color: 'black' }}
                          inputProps={{ placeholder: "Selecciona Fecha y Hora" }}
                          onChange={this.handleDateUntilChange}
                        />
                      </FormControl>
                      <br />
                      <br />
                    </GridItem>
                    <GridItem>
                      {/* <FormControl style={{ margin: 1, minWidth: 120 }}>
                    <InputLabel htmlFor="age-native-helper">Departamentos</InputLabel>
                    <Select onChange={this.handleDepartmentChange} ref="departmentBox" value={this.props.departmentData ? this.props.departmentData.department.id_departamento : ''}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {this.state.departmentsList.map(department => (
                        <MenuItem value={department.id_departamento}>{department.nombre_departamento}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Selecciona Departamento o Busca mas abajo</FormHelperText>
                  </FormControl> */}
                      <label>Departamento: {this.props.departmentData ? JSON.stringify(this.props.departmentData.department.nombre_departamento) : this.state.department}</label> <br />
                      <label>Dirección: {this.props.departmentData ? JSON.stringify(this.props.departmentData.department.direccion) : this.state.department.direccion}</label> <br />
                      <label>Precio por Noche: ${this.props.departmentData ? JSON.stringify(this.props.departmentData.department.tarifa) : this.state.department.direccion}</label> <br />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <TextField id="standard-basic" label="Cantidad Alojados" onChange={this.handleNumberGuestsChange} />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <TextField id="standard-basic" label="$ Monto Adelanto" onChange={this.handleAdvancePaymentChange} />
                    </GridItem>

                    {/* BUSCAR DEPTO */}
                    {/* <GridItem style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                  <h4 style={{ color: '#999', textAlign: 'center' }}>O Busca Uno Para Tí</h4>
                </GridItem>
                <GridItem style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                  <FormControl style={{
                    margin: 1,
                    minWidth: 120,
                  }}>
                    <InputLabel htmlFor="age-native-helper">Region</InputLabel>
                    <Select onChange={this.handleRegionChange}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {this.state.regions.map(region => (
                        <MenuItem value={region.id_region}>{region.nombre_region}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Selecciona Region</FormHelperText>
                  </FormControl>
                  <FormControl style={{
                    margin: 1,
                    minWidth: 120,
                  }}>
                    <InputLabel htmlFor="age-native-helper">Provincia</InputLabel>
                    <Select onChange={this.handleProvinceChange} disabled={this.state.provinceDisabled}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {this.state.provinces.map(province => (
                        <MenuItem value={province.id_provincia}>{province.nombre}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Selecciona Provincia</FormHelperText>
                  </FormControl>
                  <FormControl style={{
                    margin: 1,
                    minWidth: 120,
                  }}>
                    <InputLabel htmlFor="age-native-helper">Comuna</InputLabel>
                    <Select onChange={this.handleCommuneChange} disabled={this.state.communeDisabled}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {this.state.communes.map(commune => (
                        <MenuItem value={commune.id_comuna}>{commune.nombre_comuna}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Selecciona Comuna</FormHelperText>
                  </FormControl>
                  <Fab style={{ marginLeft: 2 + '%' }}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(this.state);
                      this.setState({ department: '' })
                      this.searchDepartmentByCommune(this.state.commune);
                    }} variant="extended">
                    <NavigationIcon />
                    Buscar
                </Fab>
                </GridItem> */}

                    <br /><br />

                    <GridItem xs={12} sm={12} md={4} style={{ marginLeft: 30 + '%' }}>
                      <h3 style={{ color: '#999', textAlign: 'center' }}>Servicios Extra</h3>
                    </GridItem>

                    <GridItem>
                      <div style={{ marginLeft: 170 }}>
                        <List style={{
                          width: '100%',
                          maxWidth: 360,
                          backgroundColor: '#ffffff',
                        }}>
                          {this.props.extraServicesDepartment ? (
                            <Fragment>
                              {this.props.extraServicesDepartment.map(extraService => (
                                <ListItem style={{ color: 'black' }}>
                                  <ListItemIcon>
                                    <Checkbox edge="start"
                                      onChange={() => {
                                        console.log(extraService);
                                        if (!this.state.extraServices.includes(extraService.id_servicio)) {
                                          this.state.extraServices.push(extraService.id_servicio);
                                          this.setState({ total: this.state.total + extraService.precio_servicio })
                                        } else {
                                          let indexId = this.state.extraServices.indexOf(extraService.id_servicio);
                                          this.state.extraServices.splice(indexId, 1);
                                          this.setState({ total: this.state.total - extraService.precio_servicio })
                                        }
                                      }}
                                      tabIndex={-1}
                                      disableRipple
                                      inputProps={{ 'aria-labelledby': extraService.id_departamento_servicio }} />
                                  </ListItemIcon>
                                  <ListItemText id={extraService.id_departamento_servicio} primary={extraService.nombre_servicio} />
                                  <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="comments">
                                      ${extraService.precio_servicio}
                                    </IconButton>
                                  </ListItemSecondaryAction>
                                </ListItem>
                              ))}
                          </Fragment>
                          ) :(null)}
                        </List>
                      </div>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4} style={{ marginLeft: 30 + '%' }}>
                      <h3 style={{ color: '#999', textAlign: 'center' }}>Total: ${this.state.total}</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} style={{ marginLeft: 40 + '%' }}>
                      <Fab onClick={(e) => {
                        e.preventDefault();
                        console.log(this.state);
                        if(this.validation()) {
                          this.saveClient();
                        }
                        //this.validation();
                      }} variant="extended">
                        <NavigationIcon style={{ marginRight: 'theme.spacing(1)' }} />
                    Reservar
                </Fab>
                    </GridItem>
                  </GridContainer>
                </form>
              </GridItem>
            </GridContainer>
          </div>
        ) : (
            <div style={{ padding: 70 + 'px 0' }}>
              <GridContainer justify="center">
                <GridItem cs={12} sm={12} md={8}>
                  <h2 style={{ color: 'black', textAlign: 'center' }}>Reservemos</h2>
                  <hr />
                  <br />
                  <h4 style={{ color: 'gray', textAlign: 'center' }}>
                    Selecciona tu Departamento en "Reservar"
              </h4>
                </GridItem>
              </GridContainer>
            </div>
          )}
      </Fragment>
    );
  }
}

export default WorkSection;
