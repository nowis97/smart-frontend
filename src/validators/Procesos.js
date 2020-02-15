import * as yup from "yup";

export const validationSchemaPreventiva = yup.object().shape({
    bandaRodado_111: yup.number('Debe ser un numero').min(0,'Debe ser mayor o igual a cero')
        .max(50,'Debe ser menor a 50'),

    bandaLateral_112: yup.number('Debe ser un numero').min(0,'Debe ser mayor o igual a cero')
        .max(50,'Debe ser menor a 50'),

    hombro_113: yup.number('Debe ser un numero').min(0,'Debe ser mayor o igual a cero')
        .max(50,'Debe ser menor a 50'),

    talon_116:yup.number('Debe ser un numero').min(0,'Debe ser mayor o igual a cero')
        .max(50,'Debe ser menor a 50'),

    butilo_118:yup.number('Debe ser un numero').min(0,'Debe ser mayor o igual a cero')
        .max(50,'Debe ser menor a 50')

});

export const validationSchemaCorrectiva = yup.object().shape({
    bandaRodado_121: yup.number('Debe ser un numero').min(0,'Debe ser mayor o igual a cero')
        .max(50,'Debe ser menor a 50'),

    bandaLateral_122: yup.number('Debe ser un numero').min(0,'Debe ser mayor o igual a cero')
        .max(50,'Debe ser menor a 50'),

    hombro_123: yup.number('Debe ser un numero').min(0,'Debe ser mayor o igual a cero')
        .max(50,'Debe ser menor a 50'),

    talon_126:yup.number('Debe ser un numero').min(0,'Debe ser mayor o igual a cero')
        .max(50,'Debe ser menor a 50'),
});

export const validationSchemaKalUltra = yup.object().shape({
    bandaRodado_131: yup.number('Debe ser un numero').min(0,'Debe ser mayor o igual a cero')
        .max(50,'Debe ser menor a 50'),

    bandaLateral_132: yup.number('Debe ser un numero').min(0,'Debe ser mayor o igual a cero')
        .max(50,'Debe ser menor a 50'),

    hombro_133: yup.number('Debe ser un numero').min(0,'Debe ser mayor o igual a cero')
        .max(50,'Debe ser menor a 50'),


});

export const validationSchemaRenovado = yup.object().shape({
   codigoCauchoBase:yup.string().max(10,'Debe tener menos de diez caracteres').min(1,'Debe tener al menos un caracter'),
   cauchoUtilizado: yup.number().min(1,'Debe ser mayor a uno').max(20000,'No puede superar los 20000 (Kg)'),
   otdRenovado: yup.number().min(1,'Debe ser mayor a uno').max(100,'No puede superar los 100 (mm)'),
   pesoCarcasa: yup.number().min(1,'Debe ser mayor a uno').max(20000,'No puede superar los 20000 (Kg)'),
   cauchobanda1: yup.string().max(10,'Debe tener menos de diez caracteres').min(1,'Debe tener al menos un caracter'),
   cauchobanda2: yup.string().max(10,'Debe tener menos de diez caracteres').min(1,'filesDebe tener al menos un caracter'),
});

