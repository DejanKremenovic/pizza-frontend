import React from 'react';
import { getSingleProduct } from '../../actions/productsActions';

class ProductSingle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          product:{},
            selectedId: this.props.selectedId,
            amount: 0
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
                                <p>Price: {this.state.product.price} $</p>
                                <input className="Input" type="number" min="1" onChange={this.handleChange}></input>
                                <button  className="Button" onClick={this.addToCart}>Add to cart</button>
                            </div>
                        }
                    </div>
            </div>
        );
    }
}

export default ProductSingle;
