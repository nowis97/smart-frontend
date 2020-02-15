import axios from 'axios';
import Cookie from 'js-cookie';
import * as helpers from '../helpers/helpers'
import * as _ from 'lodash';

const URI = process.env.REACT_APP_API_URL;

const headerJson = {
   'Content-Type':'application/json',
   'Authorization':'Bearer '+Cookie.get('token')
};

const ingresarPlanta = planta =>{
   planta = helpers.renameProps(planta,{'initialStatePlanta':'planta','initialStateRenovados':'renovados','initialStateReparaciones':'reparaciones'});

   planta.planta.garantia = planta.reparaciones.garantia;

   planta.planta = helpers.renameProps(planta.planta,{
      'mesProduccion':'fechaProduccion',
      'condicionFinal':'condicionFinalid',
      'planta':'plantaid',
      'codigoBaja':'codigosBajascode'
   });

   if (planta.initialStateForms.renovado === false && planta.initialStateForms.reparacion === false)
      return axios.post(URI+'trabajos',_.pick(planta,'planta'),headerJson);


   if (planta.initialStateForms.renovado){
      const {pesoCarcasa,otdRenovado,cauchoUtilizado}= planta.renovados;
      planta.renovados.pesoCarcasa = parseInt(pesoCarcasa);
      planta.renovados.otdRenovado = parseInt(otdRenovado);
      planta.renovados.cauchoUtilizado=parseInt(cauchoUtilizado);


      planta.renovados = helpers.renameProps(planta.renovados,{
         'cauchoBanda1':'codigoCauchoBanda',
         'cauchoBanda2':'codigoCauchoBanda2'
      });


      return axios.post(URI+'trabajos',_.pick(planta,'planta','renovados'),headerJson)

   }else{
      planta.reparaciones.preventiva = helpers.renameProps(planta.reparaciones.preventiva,{
         'bandaRodado_111':'bandaRodado',
         'bandaLateral_112':'bandaLateral',
         'hombro_113':'hombro',
         'talon_116':'talon',
         'butilo_118':'butilo'
      });

      planta.reparaciones.reparacionCorrectiva = helpers.renameProps(planta.reparaciones.reparacionCorrectiva,{
         'bandaRodado_121':'bandaRodado',
         'bandaLateral_122':'bandaLateral',
         'hombro_123':'hombro',
         'talon_126':'talon'
      });

      planta.reparaciones.reparacionKalUltra = helpers.renameProps(planta.reparaciones.reparacionKalUltra,{
         'bandaRodado_131':'bandaRodado',
         'bandaLateral_132':'bandaLateral',
         'hombro_133':'hombro'
      });

      return axios.post(URI+'trabajos',_.pick(planta,'planta','reparaciones','initialStateForms'),headerJson)
   }

};


export {ingresarPlanta}