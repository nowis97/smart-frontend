import axios from 'axios';
import * as helpers from '../helpers/helpers';
import Cookie from 'js-cookie';
const URI = process.env.REACT_APP_API_URL;

const header = {
   'Content-Type':'application/json',
   'Authorization':'Bearer '+Cookie.get('token')
};

const obtenerListosDespachar = () =>{
   return axios.get(URI+'trabajados',{headers:{header}});
};

const despacharNeumatico = (despacho,procesoId,serie) => {
   despacho.procesosid = procesoId;
   despacho = helpers.renameProps(despacho,{'patente':'patenteCamion'});
   debugger;
   return axios.post(URI+'despachos/despachar',{despacho,serie},header)
};

const obtenerDespachados = () =>{
   return axios.get(URI+'despachados',{headers:header})
};

export {obtenerListosDespachar,despacharNeumatico,obtenerDespachados}