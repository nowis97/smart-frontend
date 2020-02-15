import axios from 'axios';
import Cookie from 'js-cookie';
import * as helpers from '../helpers/helpers'
import * as _ from 'lodash';

const URI = process.env.REACT_APP_API_URL;

const headerJson = {
    'Content-Type':'application/json',
    'Authorization':'Bearer '+Cookie.get('token')
};

const reporte = filtro =>{
    return  axios.get(URI+'reportes/'+filtro.nombreReporte,{ params: {
            fechaInicio: filtro.fechaInicio,
            fechaTermino:filtro.fechaTermino,
            faena:filtro.cliente
        },headers:headerJson});

};

const exportarReporte = filtro =>{
    return axios.get(URI+'reportes/export/'+filtro.nombreReporte,{
        params:{
            fechaInicio: filtro.fechaInicio,
            fechaTermino:filtro.fechaTermino,
            faena:filtro.cliente
        },responseType:"blob"
    ,headers:headerJson})
};



export {reporte,exportarReporte}