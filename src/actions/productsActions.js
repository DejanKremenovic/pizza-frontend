import axios from 'axios';
import { BACKEND_URL } from '../config';

export const getProducts = () => {
    return axios.get(`${BACKEND_URL}products`, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => res.data)
    .catch(err => console.log(err));
}


export const getSingleProduct = (id) => {
    return axios.get(`${BACKEND_URL}products/${id}`, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => res.data)
    .catch(err => console.log(err));
}