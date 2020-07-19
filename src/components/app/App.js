import React from "react";
import "./App.css";
import { Products } from "../products";
import { Cart } from "../cart";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Login } from "../auth";
import { isAuthenticated } from "../../utils";
import Logout from "../auth/Logout";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCart: false,
      isAuthenticated: isAuthenticated(),
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

  userLoggedIn() {
    this.setState((state) => ({
      isAuthenticated: true,
    }));
  }

  userLoggedOut() {
    this.setState((state) => ({
      isAuthenticated: false,
    }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>The Yummy pizza</h1>
        </header>

        <Router>
          <div className="App">
            <div>
              <Link  className="Navigation-item" exact to="/" activeClass="test">
                Home
              </Link>
              {this.state.isAuthenticated ? (
                <Link className="Navigation-item" to="/logout">
                  Log out
                </Link>
              ) : (
                <Link className="Navigation-item" to="/login">
                  Login
                </Link>
              )}
            </div>
            <Switch>
              <Route
                path="/login"
                render={(props) => (
                  <Login {...props} onLogin={this.userLoggedIn.bind(this)} />
                )}
              />
              <Route
                path="/logout"
                render={(props) => (
                  <Logout {...props} onLogout={this.userLoggedOut.bind(this)} />
                )}
              />
              <Route
                path="/"
                exact
                render={(routeProps) => (
                  <div className="main-container">
                    <div className="Open-cart-container">
                      <button
                        onClick={this.toggleCart.bind(this)}
                        className="Button"
                      >
                        {this.state.openCart ? "Close cart" : "Open cart"}{" "}
                      </button>
                    </div>
                    {this.state.openCart ? (
                      <Cart />
                    ) : (
                      <Products onCloseCart={this.closeCart.bind(this)} />
                    )}
                  </div>
                )}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
