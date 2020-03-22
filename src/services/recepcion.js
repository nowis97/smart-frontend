import axios from 'axios';
import * as _ from 'lodash';
import auth from "./auth";

const URI = process.env.REACT_APP_API_URL;


const ingresarRecepcion = async recepcion =>{

    let numberCatalogue = recepcion.numeroCatalogo;
    let serie = recepcion.neumaticosserie;
    try {
        await axios.patch(URI+'neumaticos/'+serie,{'catalogocatalogueNumber':numberCatalogue},{headers:auth.jsonHeader()})
    }catch (e) {
        return e;

    }

   recepcion= _.pick(recepcion,'kmsOperacion','hrsOperacion','rtd','fecha','ingresosid','causaRecepcionid');

   recepcion.kmsOperacion = parseInt(recepcion.kmsOperacion);
   recepcion.hrsOperacion = parseInt(recepcion.hrsOperacion);
   recepcion.rtd = parseInt(recepcion.rtd);
   recepcion.causaRecepcionid = parseInt(recepcion.causaRecepcionid);
   recepcion.ingresosid = parseInt(recepcion.ingresosid);
   return axios.post(URI+'recepciones',recepcion,{headers:auth.jsonHeader()})
};

const neumaticoEnToms = serie =>{
    return axios.get(URI+'recepcionados/toms/'+serie,{headers:auth.jsonHeader()})
};

const obtenerRecepcionados = () =>{
    debugger;
    return axios.get(URI+'recepcionados',{headers:auth.jsonHeader()})
};

export {ingresarRecepcion,obtenerRecepcionados,neumaticoEnToms}