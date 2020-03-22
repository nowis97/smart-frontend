import axios from 'axios';
import Cookies from 'js-cookie';
const URI = process.env.REACT_APP_API_URL;

const jsonHeader = () => ({
    "Content-Type": "application/json",
    "Authorization": 'Bearer '+Cookies.get('token')
});

function login(username, password) {
    console.log(URI);
     return  axios.post(URI + 'users/login', {'username': username, 'password': password},{headers:jsonHeader()}).then((resp)=>{
        Cookies.set('token',resp.data.token,{expires:8/48});
        Cookies.set('username',resp.data.id,{expires: 8/48});
        return resp;
    });



}

function isAuthenticated() {
    return !!Cookies.get('token');

}

function logout() {
    Cookies.remove('token');
    Cookies.remove('username');
}



const obtenerRoles = async () => (await axios.get(URI + 'roles',{headers:jsonHeader()})).data;

export default {login,logout,isAuthenticated,obtenerRoles,jsonHeader};