import React from "react";
import "./App.css";
import { Products } from "../products";
import { Cart } from "../cart";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCart: false,
    };
  }

  toggleCart() {
    this.setState((state) => ({
      openCart: !state.openCart,
    }));
  }

  closeCart() {
    this.setState((state) => ({
      openCart: false,
    }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>The Yummy pizza</h1>
        </header>
        <div className="main-container">
          <div className="Open-cart-container">
            <button onClick={this.toggleCart.bind(this)} className="Button">
              {this.state.openCart ? "Close cart" : "Open cart"}{" "}
            </button>
          </div>
          {this.state.openCart ? (
            <Cart />
          ) : (
            <Products onCloseCart={this.closeCart.bind(this)} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
