import axios from 'axios';

const URI = 'http://localhost:3001/';

const header = {
    "Content-Type": "application/json"
};

async function login(username, password) {
    let user = await axios.post(URI + 'users/login', {'username': username, 'password': password},header);
    console.log(user);

}

export default login;