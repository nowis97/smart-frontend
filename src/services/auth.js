import axios from 'axios';
import Cookie from 'js-cookie';
const URI = process.env.REACT_APP_API_URL;

const header = {
    "Content-Type": "application/json"
};

function login(username, password) {
    console.log(URI);
     return  axios.post(URI + 'users/login', {'username': username, 'password': password},header).then((resp)=>{
        Cookie.set('token',resp.data.token,{expires:8/48});
        Cookie.set('username',resp.data.id,{expires: 8/48});
        return resp.data;
    }).catch((err)=>{
        return err;
    });



}

function isAuthenticated() {
    return !!Cookie.get('token');

}

function logout() {
    Cookie.remove('token');
    Cookie.remove('username');
}

export default {login,logout,isAuthenticated};