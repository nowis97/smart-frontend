import axios from 'axios';
import Cookie from 'js-cookie';


const URI = process.env.REACT_APP_API_URL;

const header = {
    'Content-Type':'application/json',
    'Authorization':'Bearer '+Cookie.get('token')
};


const ingresarFactura = factura =>{
    return axios.post(URI+'facturas/facturar',factura,{headers:header});
};

export {ingresarFactura}