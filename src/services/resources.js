import axios from 'axios'
import auth from "./auth";
const URI = process.env.REACT_APP_API_URL;



const obtenerTipoMinas = async ()=>{
    return (await axios.get(URI + 'tipo-minas',{headers:auth.jsonHeader()       })).data;

};

const obtenerRegiones = async ()=>{
    return (await axios.get(URI + 'regiones',{headers:auth.jsonHeader()})).data;
};

const obtenerMarcas = async () =>{
    return (await axios.get(URI + 'catalogo/marcas',{headers:auth.jsonHeader()})).data;
};

const obtenerMedidasSegunMarca = async (marca) =>{
     return (await axios.get(URI + `catalogo/medida/${marca}`
     ,{headers:auth.jsonHeader()})).data
};

const obtenerModelosSegunMarcaMedida = async (marca,medida) => (await axios
    .get(URI + `catalogo/modelo/${marca}/${encodeURIComponent(medida)}`,{headers:auth.jsonHeader()})).data;

const obtenerNumeroCatalogo = async (marca,medida,modelo,compuesto) => (await axios
    .get(URI + `catalogo/numero-catalogo/${marca}/${ encodeURIComponent(medida)}/${modelo}/${compuesto}`
    ,{headers:auth.jsonHeader()})).data;

const obtenerCompuestos = async (marca,medida,modelo) => (await axios
    .get(URI + `catalogo/compuesto/${marca}/${encodeURIComponent(medida)}/${modelo}`,{headers:auth.jsonHeader()})).data;

const obtenerCausaRecepcion = async () => (await axios.get(URI + 'causa-recepcion',{headers:auth.jsonHeader()})).data;

const obtenerPlantas = async () => (await axios.get(URI + 'plantas',{headers:auth.jsonHeader()})).data;

const obtenerCodigos = async () => (await axios.get(URI + 'codigos-bajas',{headers:auth.jsonHeader()})).data;

const obtenerCondicionFinal = async () => (await axios.get(URI + 'condicion-final',{headers:auth.jsonHeader()})).data;




export default {obtenerTipoMinas,obtenerRegiones,obtenerMarcas,obtenerMedidasSegunMarca,
    obtenerNumeroCatalogo,obtenerModelosSegunMarcaMedida,obtenerCompuestos,
    obtenerCausaRecepcion,obtenerPlantas,obtenerCodigos,obtenerCondicionFinal,

};