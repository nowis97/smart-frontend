import axios from  'axios';
import * as helpers from '../helpers/helpers';
import auth from "./auth";
const URI = process.env.REACT_APP_API_URL;




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
        headers:auth.jsonHeader()
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
       headers:auth.jsonHeader()
   })).data
 };



export {crearCliente,obtenerClientes};