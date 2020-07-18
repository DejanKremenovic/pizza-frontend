import React from 'react';
import './Products.css';
import ProductSingle from './ProductSingle';
import { getProducts } from '../../actions/productsActions';

class Products extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        products: [],
        openSingle: false,
        selectedId: null
        };
    }
    
    componentDidMount() {
        getProducts().then((products) => {
          this.setState({ products: products.data });
        });
      }

    toggleSingleComponent(id) {
        this.setState(state => ({
            selectedId: id,
            openSingle: !this.state.openSingle
          }));
    }
    
    render() {
        if(this.state.openSingle) {
            return (
                <div>
                    <ProductSingle selectedId={this.state.selectedId}/>
                    <button  className="Button-cancel" onClick={this.toggleSingleComponent.bind(this)}>Go back</button>
                </div>
            )
        }
        return (
            <div>
                    <div className="Products-container">
                        {this.state.products.map(product => (
                            <div className="Product-single">
                                {product.name}
                                <img class="Product-image-list" src={product.imageUrl} alt={product.name}/>
                                <p>Price: {product.price} $</p>
                                <button className="Button"
                                 onClick={this.toggleSingleComponent.bind(this, product.id)}>Order</button>
                            </div>
                        ))}
                    </div>
            </div>
        );
    }
}

export default Products;
