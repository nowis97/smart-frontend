import * as yup from "yup";

export const validationSchema = yup.object().shape({
    serie: yup.string().min(3,'Debe tener al menos 3 caracteres').max(13,'Debe tener menos de 13 caracteres'),
    //reSerie: yup.string().min(3,'Debe tener al menos 3 caracteres').max(13,'Debe tener menos de 13 caracteres'),
    reSerie: yup.string().oneOf([yup.ref('serie'),null],'Las series deben ser iguales'),
    guiaDespacho: yup.string().min(1,'Debe tener 1 caracter al menos').max(10,'Debe tener maximo 10 caracteres'),
    patenteCamion:yup.string().min(6,'Debe tener 6 caracteres').max(6,'Debe tener 6 caracteres').matches(/[A-Z]{4}[0-9]{2}/,'Ingrese el Formato Correcto (LLLLNN)'),
    fecha:yup.date()

});