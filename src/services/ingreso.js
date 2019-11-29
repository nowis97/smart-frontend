import axios from 'axios';
import Cookie from 'js-cookie';
const URI = process.env.REACT_APP_API_URL;



function uploadImage(file,name) {
    console.log(file);
    const formData = new FormData();
    formData.append(name,file[0]);
    return  axios({
        method:'post',
        url:URI+'show-body',
        data: formData,
        headers:{'content-type':'multipart/form-data',
        'accept':'multipart/form-data'}
    }).then(
        resp=>{
            return resp;
        }
    ).catch(err=>{
        return err;
    })

}

const ingresarNeumatico = (ingreso) =>{

    const header = {'Content-Type':'application/json'};
    return axios
        .post(URI+'ingreso',ingreso,header)
        .then(
            resp => resp
        ).catch(
            err => err
        )
};

export default uploadImage;
