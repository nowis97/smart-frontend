import axios from  'axios';
import Cookie from 'js-cookie';
import * as helpers from '../helpers/helpers';
const URI = process.env.REACT_APP_API_URL;

const token = Cookie.get('token');
const header = {
    'Content-Type':'application/json',
    'Authorization':'Bearer '+token
};

const obtenerClientes =async () => {

    return (await axios.get(URI + 'clientes', {
        params: {
            'filter': {
                'fields':{
                    id:true,
                    faena:true
                }
            }
        },
        headers:header
    })).data
};

const crearCliente =async (cliente) =>{

    cliente.longitud = parseFloat(cliente.longitud);
    cliente.latitud = parseFloat(cliente.latitud);

    cliente =helpers.renameProps(cliente,{
        'nombreFaena': 'faena',
        'region':'regionesid',
        'tipoMina':'tipoMinasid'
    });
   return (await axios.post(URI + 'clientes', cliente, {
       headers:header
   })).data
 };



export {crearCliente,obtenerClientes};