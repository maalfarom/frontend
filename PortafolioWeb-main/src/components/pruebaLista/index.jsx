import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { Fragment } from "react";
import MediaCard from './lista';
import { FormHelperText, InputLabel, MenuItem, Select } from "@material-ui/core";

const dashboardRoutes = [];

const URL = 'http://localhost:3300/';

class DepartamentosComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departaments: [],
            regions: [],
            communes: [],
            provinces: [],
            region: '',
            province: '',
            commune: '',
            open: false,
            provinceDisabled: true,
            communeDisabled: true
        }
        //this.getDepartments();
        console.log(props);
        this.handleRegionChange = this.handleRegionChange.bind(this);
        this.handleProvinceChange = this.handleProvinceChange.bind(this);
        this.handleCommuneChange = this.handleCommuneChange.bind(this);
    }

    componentDidMount() {
        this.getDepartments();
        this.getRegions();
        console.log(this.state.open);
        console.log(this.props);
        console.log('SE MONTO DEPARTAMENTOS');
    }

    getDepartments() {
        let endpoint = `${URL}departamentos`;

        console.log('GET DEPARTMENTS FROM DIALOG');

        fetch(endpoint, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ departaments: data });
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

    searchDepartmentByCommune(idCommune) {
        let endpoint = `${URL}departamento/comuna`

        let json = JSON.stringify(`{"id": ${idCommune}}`);
        console.log(json);

        fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.parse(json) })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ departaments: data })
            })
    }




    handleClose = () => {
        this.setState({ open: false });
    }

    handleRegionChange(e) {
        this.setState({ region: e.target.value, communes: [], communeDisabled: true, provinceDisabled: false }, () => {
            this.getProvinces(this.state.region);
        });
    }
    handleProvinceChange(e) {
        this.setState({ province: e.target.value, communeDisabled: false }, () => {
            this.getCommunes(this.state.province);
        });
    }
    handleCommuneChange(e) {
        this.setState({ commune: e.target.value }, () => {
            this.searchDepartmentByCommune(this.state.commune);
        });
    }

    handleData = (data) => {
        this.props.deparmentData(data);
        //this.setState({ open: false });
    }

    render() {
        return (
            <Fragment>
                <Button color="danger"
                    size="lg"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState({ open: true });
                    }}>
                    Reservar
                </Button>
                <div>
                    <Dialog open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Departamentos</DialogTitle>
                        <DialogContent style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <DialogContentText>
                                Busca tu Departamento
                                <hr />
                                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>

                                    <InputLabel htmlFor="age-native-helper">Region</InputLabel>
                                    <Select onChange={this.handleRegionChange} style={{ width: 120, margin: 3 }}>
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {this.state.regions.map(region => (
                                            <MenuItem value={region.id_region}>{region.nombre_region}</MenuItem>
                                        ))}
                                    </Select>
                                    <InputLabel htmlFor="age-native-helper">Provincia</InputLabel>
                                    <Select onChange={this.handleProvinceChange} style={{ width: 120, margin: 3 }} disabled={this.state.provinceDisabled}>
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {this.state.provinces.map(province => (
                                            <MenuItem value={province.id_provincia}>{province.nombre}</MenuItem>
                                        ))}
                                    </Select>
                                    <InputLabel htmlFor="age-native-helper">Comuna</InputLabel>
                                    <Select onChange={this.handleCommuneChange} style={{ width: 120, margin: 3 }} disabled={this.state.communeDisabled}>
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {this.state.communes.map(commune => (
                                            <MenuItem value={commune.id_comuna}>{commune.nombre_comuna}</MenuItem>
                                        ))}
                                    </Select>
                                    <br /><br />
                                </div>
                                <DialogTitle id="form-dialog-title">Departamentos</DialogTitle>
                            </DialogContentText>
                            <div style={{ marginLeft: 18 + '%' }}>
                                {this.state.departaments.map(department => (
                                    <MediaCard departamento={department} dataDepartment={this.handleData}/>
                                ))}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Fragment>
        );
    }
}

export default DepartamentosComponent;