import axios from 'axios';
import * as helpers from '../helpers/helpers';
import auth from "./auth";
const URI = process.env.REACT_APP_API_URL;


const obtenerListosDespachar = () =>{
   return axios.get(URI+'trabajados',{headers:auth.jsonHeader()});
};

const despacharNeumatico = (despacho,procesoId,serie) => {
   despacho.procesosid = procesoId;
   despacho = helpers.renameProps(despacho,{'patente':'patenteCamion'});

   return axios.post(URI+'despachos/despachar',{despacho,serie},{headers:auth.jsonHeader()})
};

const obtenerDespachados = () =>{
   return axios.get(URI+'despachados',{headers:auth.jsonHeader()})
};

export {obtenerListosDespachar,despacharNeumatico,obtenerDespachados}