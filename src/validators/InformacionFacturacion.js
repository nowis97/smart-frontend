import * as yup from 'yup'

export const validationSchema = yup.object().shape({
   numeroFactura: yup.string().min(3,'Debe tener al menos tres').max(10,'Debe tener un maximo de diez'),
   estadoPago: yup.date(),
   fecha:yup.date(),

});