import React from 'react';
import { List, Datagrid, TextField, EmailField, ReferenceField,ReferenceInput,
    Edit,Create, SimpleForm,TextInput,required,SelectInput,EditButton
}
    from 'react-admin';
export const UsersRolesList = props => (
    <List {...props}>
        <Datagrid >
            <ReferenceField source="usersid" reference="users" label = "Users">
                <TextField source="nombre" />
            </ReferenceField>
            <ReferenceField source="rolesid" reference="roles" label={"Rol"}>
                <TextField source="nombre" />
            </ReferenceField>
            <EditButton/>
        </Datagrid>
    </List>
);

export const UsersRolesCreate = props => (
    <Create {...props} successMessage={"Role assigned"}>
        <SimpleForm {...props} redirect={"list"}>

            <ReferenceInput source="usersid" reference="users" label="User">
                <SelectInput optionText="nombre" />
            </ReferenceInput>
            <ReferenceInput source="rolesid" reference="roles" label="Role" >
                <SelectInput optionText="nombre"  />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export const UsersRolesEdit = props => {

    return <Edit {...props}>
        <SimpleForm {...props} redirect >
            <ReferenceInput source="usersid" reference="users" label="Users">
                <SelectInput optionText="nombre" />
            </ReferenceInput>
            <ReferenceInput source="rolesid" reference="roles" label="Roles" >
                <SelectInput optionText="nombre"  />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
};
