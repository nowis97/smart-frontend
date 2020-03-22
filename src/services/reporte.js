import axios from 'axios';
import auth from "./auth";

const URI = process.env.REACT_APP_API_URL;



const reporte = filtro =>{
    return  axios.get(URI+'reportes/'+filtro.nombreReporte,{ params: {
            fechaInicio: filtro.fechaInicio,
            fechaTermino:filtro.fechaTermino,
            faena:filtro.cliente
        },headers:auth.jsonHeader()});

};

const exportarReporte = filtro =>{
    return axios.get(URI+'reportes/export/'+filtro.nombreReporte,{
        params:{
            fechaInicio: filtro.fechaInicio,
            fechaTermino:filtro.fechaTermino,
            faena:filtro.cliente
        },responseType:"blob"
    ,headers:auth.jsonHeader()})
};



export {reporte,exportarReporte}