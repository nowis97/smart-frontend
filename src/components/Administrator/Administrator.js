import {Admin,Resource,ListGuesser,useQuery,EditGuesser,fetchUtils} from "react-admin";

import React from "react";
import Cookie from 'js-cookie';
import lb4Provider from "../../services/lb4";

import {UsersCreate, UsersEdit, UsersList} from './users'
import {RolesCreate, RolesEdit, RolesList} from "./roles";
import {UsersRolesCreate, UsersRolesEdit, UsersRolesList} from "./users_roles";
import LogoutButton from "./LogoutButton";
import Login from "../Login";
import {ClientesCreate, ClientesEdit, ClientesList} from "./clientes";

const API_URL = process.env.REACT_APP_API_URL;

export function Administrator(props) {

    const dataProvider = lb4Provider(API_URL);

    return <Admin loginPage={Login} dataProvider = {dataProvider} logoutButton = {LogoutButton}  >
        <Resource name = "users" list = {UsersList} edit = {UsersEdit} create = {UsersCreate}/>
        <Resource name = "roles" list={RolesList} edit={RolesEdit} create={RolesCreate}/>
        <Resource name = "users-roles" list={UsersRolesList} edit={UsersRolesEdit} create={UsersRolesCreate} options = {{label:'Assign Roles'}} />
        <Resource name ="clientes" list={ClientesList} create={ClientesCreate} edit={ClientesEdit} />
        <Resource name={"tipo-minas"} />
        <Resource name={"regiones"} />
    </Admin>

}