import axios from 'axios';
import { BACKEND_URL } from '../config';

export const getProductsFromStorage = () => {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): [];
}

export const addToCart = (product, amount) => {
    let content = {
        'id': product.id,
        'name': product.name,
        'price': product.price,
        'amount': amount,
        'currency': 'EUR',
    };
    let cart = localStorage.getItem('cart');

    if(cart) {
        cart = JSON.parse(cart);
        let doesExist = false;
        for(var i = 0; i < cart.length; i++){
            if(cart[i]['id'] === product.id) {
                content['amount'] = parseInt(cart[i]['amount']) + parseInt(content['amount']); 
                cart[i] = content;
                doesExist = true;
                break;
            }
        }
        if(!doesExist){
            cart.push(content);
        }
    }
    else {
        cart = [content];
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const checkout = (products) => {
    const body = JSON.stringify(products);
    return axios.post(`${BACKEND_URL}orders`, body, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => res.data)
    .catch((error) => {
        let title = error.response.data.status;
        let body = error.response.data.errors;
        console.log(body)
    });
}