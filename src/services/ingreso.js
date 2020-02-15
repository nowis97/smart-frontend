import axios from 'axios';
import Cookie from 'js-cookie';
import * as helpers from '../helpers/helpers'

const URI = process.env.REACT_APP_API_URL;

const headerJson = {
    'Content-Type':'application/json',
    'Authorization':'Bearer '+Cookie.get('token')
};

const headerMultipart = {'Content-Type':'multipart/form-data'};


function uploadImage(files,name) {

    const formData = new FormData();
    const file = files[0];
    debugger;
    if (files.length===0) return {filename:''};
    formData.append('file',file,name +'.'+ file.name.split('.').pop());

    return axios.post(URI+'upload-image',formData,{
        headers:{...headerMultipart,['Authorization']:'Bearer '+Cookie.get('token')
        }}).then(
        res => res.data
    ).catch(
        err => err
    )



}

const ingresarNeumatico = async ingreso =>{
    const resp = await uploadImage(ingreso.fotoNeumatico,ingreso.serie);


    ingreso.fotoNeumatico = resp.filename;
    ingreso.guiaKaltire = Number(ingreso.guiaKaltire);
    ingreso.fecha = new Date(ingreso.fecha);
    ingreso.serie = ingreso.serie.toUpperCase();

    delete ingreso.reSerie;
   ingreso = helpers.renameProps(ingreso,{
        'serie':'neumaticosserie',
        'comentarios':'comentario',
        'fotoNeumatico':'rutaFoto',
        'cliente':'clientesid',
        'guiaKaltire':'guiaKt'
    });
   return axios
        .post(URI+'ingresos',ingreso,headerJson)

};

const obtenerNeumaticos = async () =>{
    return await axios
        .get(URI+'ingresados',headerJson);
};



export  {uploadImage,ingresarNeumatico,obtenerNeumaticos};
