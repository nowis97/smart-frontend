import React from 'react';
import { List, Datagrid, TextField, EmailField,
    Edit,Create, SimpleForm,TextInput,required,EditButton
}
    from 'react-admin';

export const UsersList = props => (
    <List {...props}>
        <Datagrid  >
            <TextField source="id"  />
            <TextField source="nombre"  />
            <EmailField source="email" />
            <TextField source="password" />
           <EditButton />

        </Datagrid>
    </List>
);

export const UsersCreate = props => (
    <Create {...props} successMessage = "Create Sucess">
        <SimpleForm redirect={"list"}>
            <TextInput source = "nombre" label = "ID" validate={required()} />
            <TextInput source = "password" label = "Password" type={"password"} validate={required()} />
            <TextInput source = "email" label = "E-mail" type={"email"} validate={required()} />
        </SimpleForm>
    </Create>
);



export const UsersEdit = props => {
  return <Edit {...props} successMessage = "Update Sucess">
        <SimpleForm redirect>
            <TextInput disabled label="Id" source="id"/>
            <TextInput source="nombre" label="Name" validate={required()}/>
            <TextInput source="password" label="Password" type={"password"} validate={required()}/>
            <TextInput source="email" label="E-mail" type={"email"} validate={required()}/>
        </SimpleForm>
    </Edit>
};