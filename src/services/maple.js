import axios from 'axios';
import Cookie from 'js-cookie';

const URI = process.env.REACT_APP_API_URL;

const headerJson = {
    'Content-Type':'application/json',
    'Authorization':'Bearer '+Cookie.get('token')
};

const headerMultipart = {'Content-Type':'multipart/form-data'};

const importarExcel = data => {

    const form = new FormData();
    form.append('file',data,'maple-import.xlsx');

    return axios.post(URI+'import-excel', form,{...headerMultipart,['Authorization']:headerJson.Authorization});

};

export {importarExcel}