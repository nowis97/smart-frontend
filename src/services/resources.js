import axios from 'axios'
import Cookie from "js-cookie";
const URI = process.env.REACT_APP_API_URL;
const headerJson = {
    'Content-Type':'application/json',
    'Authorization':'Bearer '+Cookie.get('token')
};


const obtenerTipoMinas = async ()=>{
    return (await axios.get(URI + 'tipo-minas',headerJson)).data;

};

const obtenerRegiones = async ()=>{
    return (await axios.get(URI + 'regiones',headerJson)).data;
};

const obtenerMarcas = async () =>{
    return (await axios.get(URI + 'catalogo/marcas',headerJson)).data;
};

const obtenerMedidasSegunMarca = async (marca) =>{
     return (await axios.get(URI + `catalogo/medida/${marca}`
     ,headerJson)).data
};

const obtenerModelosSegunMarcaMedida = async (marca,medida) => (await axios
    .get(URI + `catalogo/modelo/${marca}/${encodeURIComponent(medida)}`,headerJson)).data;

const obtenerNumeroCatalogo = async (marca,medida,modelo,compuesto) => (await axios
    .get(URI + `catalogo/numero-catalogo/${marca}/${ encodeURIComponent(medida)}/${modelo}/${compuesto}`
    ,headerJson)).data;

const obtenerCompuestos = async (marca,medida,modelo) => (await axios
    .get(URI + `catalogo/compuesto/${marca}/${encodeURIComponent(medida)}/${modelo}`,headerJson)).data;

const obtenerCausaRecepcion = async () => (await axios.get(URI + 'causa-recepcion',headerJson)).data;

const obtenerPlantas = async () => (await axios.get(URI + 'plantas',headerJson)).data;

const obtenerCodigos = async () => (await axios.get(URI + 'codigos-bajas',headerJson)).data;

const obtenerCondicionFinal = async () => (await axios.get(URI + 'condicion-final',headerJson)).data;




export default {obtenerTipoMinas,obtenerRegiones,obtenerMarcas,obtenerMedidasSegunMarca,
    obtenerNumeroCatalogo,obtenerModelosSegunMarcaMedida,obtenerCompuestos,
    obtenerCausaRecepcion,obtenerPlantas,obtenerCodigos,obtenerCondicionFinal,

};