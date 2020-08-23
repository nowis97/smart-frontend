import * as yup from "yup";

export const validationSchema = yup.object().shape({
  codigoCauchoBase: yup.string().min(1,'Debe tener al menos un caracter').max(10,'Debe tener menos de 10'),
  cauchoBanda1:yup.string().min(1,'Debe tener al menos un caracter').max(10,'Debe tener menos de 10'),
  cauchoBanda2:yup.string().max(10,'Debe tener menos de 10'),
  cauchoUtilizado:yup.number('Debe ser un numero').min(1,'Debe ser mayor o igual a uno')
                  .max(15000,'Debe ser menor a 15000'),
  otdRenovado:yup.number('Debe ser un numero').min(1,'Debe ser mayor o igual a uno')
      .max(170,'Debe ser menor a 170'),

  pesoCarcasa:yup.number('Debe ser un numero').min(1,'Debe ser mayor o igual a uno')
      .max(15000,'Debe ser menor a 15000')




});