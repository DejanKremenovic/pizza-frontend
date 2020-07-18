import React from 'react';
import { getProductsFromStorage, checkout } from '../../actions/cartActions';
import {convertCurrency} from '../../utils/utils';
import {DELIVERY_PRICE} from '../../config';
import './Cart.css';

class Cart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            products: [],
            total: 0,
            name: '',
            address: '',
            phone: '',
            error: '',
            success: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = e => this.setState({[e.target.name]: e.target.value});

    calculateTotal() {
        let products = this.state.products;
        let total = this.state.total;
        products.forEach((element) => {
            total = total + (element.price * element.amount);
        })
        // add delivery price to total sum
        total = total + DELIVERY_PRICE;
        this.setState({total: total.toFixed(2)})
    }

    componentDidMount() {
        let products = getProductsFromStorage();
        this.setState({ products: products }, () => {
            this.calculateTotal();
        });
      }

    checkout() {
        let body = {};
        body['products'] = this.state.products.map(product => {
            let trimmedProduct = {}
            trimmedProduct['id'] = product.id;
            trimmedProduct['amount'] = product.amount;
            return trimmedProduct
         });
         body['name'] = this.state.name;
         body['address'] = this.state.address;
         body['phone'] = this.state.phone;

        checkout(body).then((response) => {
            this.setState({
                success: response.message,
                products: [],
                total: 0,
                name: '',
                address: '',
                phone: '',
            });
            localStorage.removeItem('cart');
          });
    }
    render() {
        if(this.state.success){
            return (
                <div>
                    <p>{this.state.success}</p>
                </div>
            )
        }
        return (
            <div>
                <div className="Cart-container">
                    <div className="Cart-items">
                        <h3>Items:</h3>
                        {this.state.products.map(product => (
                            <div className="Item-single">
                                {product.name}
                        <p>Price: {product.price}€ ({convertCurrency(product.price, '$')}) x {product.amount}</p>
                            </div>
                        ))}
                    </div>
                    <h3>Total: {this.state.total}€ ({convertCurrency(this.state.total, '$')})</h3>
                    <p>*Delivery price {DELIVERY_PRICE}€ ({convertCurrency(DELIVERY_PRICE, '$')}) is included in total price</p>
                    <h3>Contact information:</h3>
                    <div className="Contact-container">                    
                        <input type="text" onChange={this.handleChange} name="name" placeholder="Name" className="Input"/>
                        <input type="text" onChange={this.handleChange} name="address" placeholder="Address" className="Input"/>
                        <input type="text" onChange={this.handleChange} name="phone" placeholder="Phone number" className="Input"/>
                        <button className="Button"  onClick={this.checkout.bind(this)}>Checkout</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;
