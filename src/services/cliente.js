import axios from  'axios';
import Cookie from 'js-cookie';
import * as helpers from '../helpers/helpers';
import * as querystring from 'querystring';
const URI = process.env.REACT_APP_API_URL;

const token = Cookie.get('token');

const obtenerClientes =async () => {

    return (await axios.get(URI + 'clientes', {
        params: {
            'filter': {
                'fields':{
                    id:true,
                    faena:true
                }
            }
        }
    })).data
};

const crearCliente =async (cliente) =>{
   const headers = {
        'Content-Type':'application/json'
   };

    cliente.longitud = parseFloat(cliente.longitud);
    cliente.latitud = parseFloat(cliente.latitud);

    cliente =helpers.renameProps(cliente,{
        'nombreFaena': 'faena',
        'region':'regionesid',
        'tipoMina':'tipoMinasid'
    });
   return (await axios.post(URI + 'clientes', cliente, headers)).data
 };



export {crearCliente,obtenerClientes};