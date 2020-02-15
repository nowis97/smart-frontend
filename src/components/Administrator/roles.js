import React from 'react';
import { List, Datagrid, TextField, EmailField,
    Edit,Create, SimpleForm,TextInput,required
}
    from 'react-admin'

export const RolesList = props =>(
    <List {...props}>
        <Datagrid rowClick="edit" >
            <TextField source="id"  />
            <TextField source="nombre"  />
            <EmailField source="description" />
        </Datagrid>
    </List>
);

export const RolesCreate = props => (
    <Create {...props} successMessage={"Rol created"}>
        <SimpleForm redirect={"list"}>
            <TextInput source = "nombre" label = "Name" validate={required()} />
            <TextInput source = "description" label = "Description"  validate={required()} />
        </SimpleForm>
    </Create>
);

export const RolesEdit = props => (
    <Edit {...props} successMessage={"Rol edited"}>
        <SimpleForm redirect={"list"}>
            <TextInput source = "nombre" label = "Name" validate={required()} />
            <TextInput source = "description" label = "Description"  validate={required()} />
        </SimpleForm>
    </Edit>
);