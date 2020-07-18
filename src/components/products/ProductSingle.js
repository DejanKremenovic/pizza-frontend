import React from 'react';
import { getSingleProduct } from '../../actions/productsActions';
import { addToCart } from '../../actions/cartActions';
import {convertCurrency} from '../../utils/utils';

class ProductSingle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          product:{},
            selectedId: this.props.selectedId,
            amount: 1,
            added: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({amount: event.target.value});
    }
    
    componentDidMount() {
        getSingleProduct(this.state.selectedId).then((products) => {
          this.setState({ product: products });
        });
      }

    addToCart = () => {
        addToCart(this.state.product, this.state.amount);
        this.setState({ added: true });
    }

    render() {
        return (
            <div>
                <div className="Single-product">
                    {
                        <div className="Product-detail">
                            <h1>{this.state.product.name}</h1>
                            <p>{this.state.product.description}</p>
                            <div class="Product-image-single" >
                                <img src={this.state.product.imageUrl} alt={this.state.product.name}/>
                            </div>
                            <p>Price: {this.state.product.price}€ ({convertCurrency(this.state.product.price, '$')})</p>
                            { !this.state.added ?
                                <input className="Input" type="number" min="1" value={ this.state.amount } onChange={this.handleChange}></input>
                                : ''
                            }
                            { !this.state.added ?
                                <button  className="Button" onClick={this.addToCart}>Add to cart</button> :
                                <button  className="Button" disabled>Added</button>
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default ProductSingle;
