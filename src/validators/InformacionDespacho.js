import * as yup from 'yup'

export const validationSchema = yup.object().shape({
    guiaDespacho:yup.string().min(3,'Debe tener al menos tres').max(10,'Debe tener un maximo de diez'),
    patente: yup.string().min(6,'Debe tener 6 caracteres')
        .max(6,'Debe tener 6 caracteres')
        .matches(/[A-Z]{4}[0-9]{2}/,'Ingrese el Formato Correcto (LLLLNN)'),
    fecha: yup.date()

});