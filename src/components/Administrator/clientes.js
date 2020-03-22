import React from 'react';
import {
    List, Datagrid, TextField, EmailField,
    Edit, Create, SimpleForm, TextInput, required, EditButton,
    BooleanField, NumberField, ReferenceInput, SelectInput,ReferenceField,SelectField,
    NumberInput,BooleanInput
}
    from 'react-admin';

export const ClientesList = props => (
    <List {...props}>
        <Datagrid {...props} >
            <TextField source="id" label={"ID"} disabled  />
            <TextField source="rut" label={"RUT"}  />
            <TextField source="faena" label={"Cliente"} />
            <TextField source="compania" label={"Compañia"} />
            <NumberField source="latitud" label={"Latitud"} />
            <NumberField source="longitud" label={"Longitud"} />
            <BooleanField source="tieneContrato" defaultValue ={false} label={"Contrato"} />

            <ReferenceField source="regionesid" reference="regiones" label="Region" >
                <TextField source="nombre" />
            </ReferenceField>
            <ReferenceField source="tipoMinasid" reference="tipo-minas" label="Tipo Mina" >
                <TextField source="nombre" />
            </ReferenceField>
            <EditButton />

        </Datagrid>
    </List>
);

export const ClientesCreate = props => (
    <Create {...props} successMessage = "Create Success">
        <SimpleForm redirect={"list"}>
            <TextInput source="rut" label={"RUT"}  />
            <TextInput source="faena" label={"Cliente"} />
            <TextInput source="compania" label={"Compañia"} />
            <NumberInput source="latitud" label={"Latitud"} />
            <NumberInput source="longitud" label={"Longitud"} />
            <BooleanInput source="tieneContrato" defaultValue={false} label={"Contrato"} />
            <ReferenceInput source="tipoMinasid" reference="tipo-minas" label="Tipo Mina" >
                <SelectInput optionText="nombre"  />
            </ReferenceInput>
            <ReferenceInput source="regionesid" reference="regiones" label="Regiones" >
                <SelectInput optionText="nombre"  />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);



export const ClientesEdit = props => {
    return <Edit {...props} successmessage = "Update Sucess">
        <SimpleForm redirect>
            <TextInput source="rut" label={"RUT"}  />
            <TextInput source="faena" label={"Cliente"} />
            <TextInput source="compania" label={"Compañia"} />
            <NumberInput source="latitud" label={"Latitud"} />
            <NumberInput source="longitud" label={"Longitud"} />
            <BooleanInput defaultValue={false} source="tieneContrato" label={"Contrato"} />
            <ReferenceInput source="tipoMinasid" reference="tipo-minas" label="Tipo Mina" >
                <SelectInput optionText="nombre"  />
            </ReferenceInput>
            <ReferenceInput source="regionesid" reference="regiones" label="Regiones" >
                <SelectInput optionText="nombre"  />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
};