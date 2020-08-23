import * as yup from 'yup'

export const validationSchema = yup.object().shape({
    ahorroCo2: yup.number('Debe ser un numero'),
    ahorroDiesel: yup.number('Debe ser un numero'),
    ahorroEmisionesCo2:yup.number('Debe ser un numero').positive('Debe se mayor a cero').max(1,'Debe ser menor que uno'),
    codProducto: yup.string().min(3,'Debe tener al menos tres').max(10,'Debe tener un maximo de diez'),
    nombreProducto: yup.string().min(3,'Debe tener al menos tres').max(30,'Debe tener un maximo de trenta')

});