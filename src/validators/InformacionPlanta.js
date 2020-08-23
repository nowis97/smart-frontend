import * as yup from 'yup'

export const validationSchema = yup.object().shape({
    ordenTrabajo: yup.string().min(3,'Debe tener al menos tres').max(10,'Debe tener un maximo de diez'),
    hrsGarantia: yup.number().min(0,'Debe ser mayor que cero').max(300000,'Debe ser menor que 300000'),
    mesProduccion: yup.date()});