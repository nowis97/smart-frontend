import * as yup from 'yup'

export const validationSchema = yup.object().shape({
   kmsOperacion: yup.number().positive('Debe ser positivo').max(10000,'No debe superar los 10000 Kms'),
   hrsOperacion: yup.number().positive('Debe ser positivo').max(10000,'No debe superar las 10000 Hrs'),
   rtd: yup.number().positive('Debe ser positivo').max(1000,'No debe superar las 1000'),
});
