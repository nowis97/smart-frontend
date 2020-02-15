import * as yup from 'yup'

export const validationSchema = yup.object().shape({
   kmsOperacion: yup.number().min(0,'Debe ser mayor que 0').max(10000,'No debe superar los 10000 Kms').required('Kms de Operacion es requerido'),
   hrsOperacion: yup.number().min(0,'Debe ser mayor que 0').max(10000,'No debe superar las 10000 Hrs').required('Horas de Operacion es requerido'),
   rtd: yup.number().min(0,'Debe ser mayor que 0').max(200,'No debe superar las 200').required('RTD es requerido'),
   fecha:yup.date()
});
