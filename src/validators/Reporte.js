    import * as yup from 'yup'

export const validationSchema = yup.object().shape({
    fechaInicio:yup.date(),
    fechaTermino:yup.date(),

});