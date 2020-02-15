import axios from 'axios';
import Cookie from 'js-cookie';
import * as helpers from '../helpers/helpers'


const URI = process.env.REACT_APP_API_URL;

const headerJson = {
    'Content-Type':'application/json',
    'Authorization':'Bearer '+Cookie.get('token')
};


const ingresarNeumatico = neumatico =>{
    return axios.post(URI+'performance',{
        serie:neumatico.serie,
        rtdActual:parseInt(neumatico.rtdActual),
        kmsActual:parseInt(neumatico.kmsActual),
        hrsActual:parseInt(neumatico.hrsActual),
        estadoActual:neumatico.estadoActual,
        fechaUltimaInspeccion: neumatico.fechaUltimaInspeccion
    },headerJson);
};

const obtenerNeumaticos = () => axios.get(URI+'performance',headerJson);

export {ingresarNeumatico,obtenerNeumaticos};