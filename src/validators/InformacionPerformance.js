import * as yup from "yup";

export const validationSchema = yup.object().shape({
    serie: yup.string().min(3,'Debe tener al menos 3 caracteres').max(13,'Debe tener menos de 13 caracteres'),
    reSerie: yup.string().oneOf([yup.ref('serie'),null],'Las series deben ser iguales'),
    fechaUltimaInspeccion: yup.date(),
    rtdActual:yup.number('Debe ser un numero').min(0,'Debe ser mayor o igual a cero')
        .max(200,'Debe ser menor a 200'),
    kmsActual:yup.number('Debe ser un numero').min(0,'Debe ser mayor o igual a cero')
        .max(300000,'Debe ser menor a 300000'),
    hrsActual:yup.number('Debe ser un numero').min(0,'Debe ser mayor o igual a cero')
        .max(300000,'Debe ser menor a 300000')

});