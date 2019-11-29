import axios from 'axios'
const URI = process.env.REACT_APP_API_URL;
const obtenerTipoMinas = async ()=>{
    return (await axios.get(URI + 'tipo-minas')).data;

};

const obtenerRegiones = async ()=>{
    return (await axios.get(URI + 'regiones')).data;
};

export default {obtenerTipoMinas,obtenerRegiones}