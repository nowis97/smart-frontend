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
    .get(URI + `catalogo/modelo/${marca}/${medida}`)).data;

const obtenerNumeroCatalogo = async (marca,medida,modelo,compuesto) => (await axios
    .get(URI + `catalogo/numero-catalogo/${marca}/${medida}/${modelo}`, {
        params: {'compuesto': compuesto ? compuesto : ''}
    })).data;

export default {obtenerTipoMinas,obtenerRegiones,obtenerMarcas,obtenerMedidasSegunMarca,
    obtenerNumeroCatalogo,obtenerModelosSegunMarcaMedida};