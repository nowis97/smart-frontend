import axios from 'axios'
const URI = process.env.REACT_APP_API_URL;
const obtenerTipoMinas = async ()=>{
    return (await axios.get(URI + 'tipo-minas')).data;

};

const obtenerRegiones = async ()=>{
    return (await axios.get(URI + 'regiones')).data;
};

const obtenerMarcas = async () =>{
    return (await axios.get(URI + 'catalogo/marcas')).data;
};

const obtenerMedidasSegunMarca = async (marca) =>{
     return (await axios.get(URI + `catalogo/medida/${marca}`
     )).data
};

const obtenerModelosSegunMarcaMedida = async (marca,medida) => (await axios
    .get(URI + `catalogo/modelo/${marca}/${encodeURIComponent(medida)}`)).data;

const obtenerNumeroCatalogo = async (marca,medida,modelo,compuesto) => (await axios
    .get(URI + `catalogo/numero-catalogo/${marca}/${ encodeURIComponent(medida)}/${modelo}/${compuesto}`
    )).data;

const obtenerCompuestos = async (marca,medida,modelo) => (await axios
    .get(URI + `catalogo/compuesto/${marca}/${encodeURIComponent(medida)}/${modelo}`)).data;

const obtenerCausaRecepcion = async () => (await axios.get(URI + 'causa-recepcion')).data;

const obtenerPlantas = async () => (await axios.get(URI + 'plantas')).data;

const obtenerCodigos = async () => (await axios.get(URI + 'codigos-bajas')).data;

const obtenerCondicionFinal = async () => (await axios.get(URI + 'condicion-final')).data;



export default {obtenerTipoMinas,obtenerRegiones,obtenerMarcas,obtenerMedidasSegunMarca,
    obtenerNumeroCatalogo,obtenerModelosSegunMarcaMedida,obtenerCompuestos,
    obtenerCausaRecepcion,obtenerPlantas,obtenerCodigos,obtenerCondicionFinal};