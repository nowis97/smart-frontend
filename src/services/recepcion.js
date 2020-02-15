import axios from 'axios';
import Cookie from 'js-cookie';
import * as _ from 'lodash';

const URI = process.env.REACT_APP_API_URL;

const headerJson = {
    'Content-Type':'application/json',
    'Authorization':'Bearer '+Cookie.get('token')
};

const ingresarRecepcion = async recepcion =>{

    let numberCatalogue = recepcion.numeroCatalogo;
    let serie = recepcion.neumaticosserie;
    try {
        await axios.patch(URI+'neumaticos/'+serie,{'catalogocatalogueNumber':numberCatalogue},headerJson)
    }catch (e) {
        return e;

    }

   recepcion= _.pick(recepcion,'kmsOperacion','hrsOperacion','rtd','fecha','ingresosid','causaRecepcionid');

   recepcion.kmsOperacion = parseInt(recepcion.kmsOperacion);
   recepcion.hrsOperacion = parseInt(recepcion.hrsOperacion);
   recepcion.rtd = parseInt(recepcion.rtd);
   recepcion.causaRecepcionid = parseInt(recepcion.causaRecepcionid);
   recepcion.ingresosid = parseInt(recepcion.ingresosid);
   return axios.post(URI+'recepciones',recepcion,headerJson)
};

const neumaticoEnToms = serie =>{
    return axios.get(URI+'recepcionados/toms/'+serie,headerJson)
};

const obtenerRecepcionados = () =>{
    return axios.get(URI+'recepcionados',headerJson)
};

export {ingresarRecepcion,obtenerRecepcionados,neumaticoEnToms}