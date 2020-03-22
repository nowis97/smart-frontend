import axios from 'axios';
import auth from "./auth";
const URI = process.env.REACT_APP_API_URL;


const headerMultipart = {'Content-Type':'multipart/form-data'};

const importarExcel = data => {

    const form = new FormData();
    form.append('file',data,'maple-import.xlsx');

    return axios.post(URI+'import-excel', form,{...headerMultipart,['Authorization']:auth.jsonHeader().Authorization});

};

export {importarExcel}