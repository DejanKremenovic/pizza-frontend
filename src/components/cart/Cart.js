import React from "react";
import {
  getProductsFromStorage,
  checkout,
  removeProductsFromStorage,
} from "../../actions/cartActions";
import { convertCurrency, getFirstError } from "../../utils/utils";
import { DELIVERY_PRICE } from "../../config";
import "./Cart.css";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      total: 0,
      name: "",
      address: "",
      phone: "",
      error: "",
      success: "",
      isEmpty: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  calculateTotal() {
    let products = this.state.products;
    let total = 0;
    products.forEach((element) => {
      total = total + element.price * element.amount;
    });
    // add delivery price to total sum
    total = total > 0 ? total + DELIVERY_PRICE : total;
    this.setState({
      total: total.toFixed(2),
      isEmpty: total > 0 ? false : true,
    });
  }

  componentDidMount() {
    let products = getProductsFromStorage();
    this.setState({ products: products }, () => {
      this.calculateTotal();
    });
  }

  checkout() {
    let body = {};
    body["products"] = this.state.products.map((product) => {
      let trimmedProduct = {};
      trimmedProduct["id"] = product.id;
      trimmedProduct["amount"] = product.amount;
      return trimmedProduct;
    });
    body["name"] = this.state.name;
    body["address"] = this.state.address;
    body["phone"] = this.state.phone;

    checkout(body)
      .then((response) => {
        removeProductsFromStorage();
        this.setState({
          success: response.data.message,
          products: [],
          total: 0,
          name: "",
          address: "",
          phone: "",
          error: "",
        });
      })
      .catch((fail) => {
        let error = getFirstError(fail);
        this.setState({ error: error });
      });
  }

  removeOneProductFromStorage(productId) {
    removeProductsFromStorage(productId);
    let products = getProductsFromStorage();
    this.setState({ products: products }, () => {
      this.calculateTotal();
    });
  }
  render() {
    if (this.state.success) {
      return (
        <div>
          <p>{this.state.success}</p>
        </div>
      );
    }
    return (
      <div>
        <div className="Cart-container">
          <div className="Cart-items">
            <h2>Items:</h2>
            {this.state.products.map((product, i) => (
              <div className="Item-single" key={i}>
                <strong>{product.name}</strong>
                <p>
                  Price: {product.price}€ ({convertCurrency(product.price, "$")}
                  ) x {product.amount}
                  <button
                    className="Button-small"
                    onClick={this.removeOneProductFromStorage.bind(
                      this,
                      product.id
                    )}
                  >
                    Remove
                  </button>
                </p>
              </div>
            ))}
          </div>
          {this.state.isEmpty ? <p>No items in cart.</p> : ""}
          <h3>
            Total: {this.state.total}€ ({convertCurrency(this.state.total, "$")}
            )
          </h3>
          <p>
            *Delivery price {DELIVERY_PRICE}€ (
            {convertCurrency(DELIVERY_PRICE, "$")}) is included in total price
          </p>
          <h3>Contact information:</h3>
          {this.state.error ? (
            <div>
              <p>Please correct contact informations:</p>
              <div className="Error">
                <p>{this.state.error}</p>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="Contact-container">
            <input
              type="text"
              onChange={this.handleChange}
              name="name"
              placeholder="Name"
              className="Input"
            />
            <input
              type="text"
              onChange={this.handleChange}
              name="address"
              placeholder="Address"
              className="Input"
            />
            <input
              type="text"
              onChange={this.handleChange}
              name="phone"
              placeholder="Phone number"
              className="Input"
            />
            <button
              className="Button"
              onClick={!this.state.isEmpty ? this.checkout.bind(this) : ""}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
