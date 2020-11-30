import React, { Fragment } from "react";

const URL = 'http://localhost:3300/';

class TestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        //Accept: "application/json",
        // "Cache-Control": "no-cache",
        // "Connection": "keep-alive",
        // "Host": "localhost:3300",
        // "If-None-Match": 'W/"1ac-CyUUBQ8yBqGF3ZoxschgWEz9ex8"',
        // "Origin": "http://localhost:3000",
        // "Pragma": "no-cache",
        // "Referer": "http://localhost:3000/",
        // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:83.0) Gecko/20100101 Firefox/83.0"
        let endpoint = `${URL}serviciosextras`;

        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json'); 
        // headers.append('Accept', 'application/json'); 
        // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000'); 
        // headers.append('GET', 'POST', 'OPTIONS'); 


        const requestOptions = {
            method: "GET",
            mode: 'no-cors'
            // headers: {
            //     "Content-Type": "application/json",
            //     Accept: "application/json",
            //     "Access-Control-Allow-Origin": "*"
            //   }
        };

        fetch(endpoint, requestOptions)
        .then(res =>{ 
            console.log('aqui fue');
            console.log(res);
        })
        .then(result => {
            console.log('fue aqui');
            console.log(result);
        })
        .catch(err => {
            console.log('ERROR');
            console.log(err);
        })


    }

    render() {
        return (
            <h1>Componente de Prueba</h1>
        )
    }

}

export default TestComponent;