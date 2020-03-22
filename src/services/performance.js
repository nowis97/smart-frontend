import axios from 'axios';
import auth from "./auth";


const URI = process.env.REACT_APP_API_URL;




const ingresarNeumatico = neumatico =>{
    return axios.post(URI+'performance',{
        serie:neumatico.serie,
        rtdActual:parseInt(neumatico.rtdActual),
        kmsActual:parseInt(neumatico.kmsActual),
        hrsActual:parseInt(neumatico.hrsActual),
        estadoActual:neumatico.estadoActual,
        fechaUltimaInspeccion: neumatico.fechaUltimaInspeccion
    },{headers:auth.jsonHeader()});
};

const obtenerNeumaticos = () => axios.get(URI+'performance',{headers:auth.jsonHeader()});

export {ingresarNeumatico,obtenerNeumaticos};