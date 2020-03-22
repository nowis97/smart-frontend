import axios from 'axios';
import auth from "./auth";

const URI = process.env.REACT_APP_API_URL;


const ingresarFactura = factura =>{
    return axios.post(URI+'facturas/facturar',factura,{headers:auth.jsonHeader()});
};

export {ingresarFactura}