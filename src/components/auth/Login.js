import React from "react";
import './Login.css';
import { getFirstError } from "../../utils";
import { loginUser } from "../../actions/AuthActions";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  login() {
    loginUser(this.state.email, this.state.password)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        this.setState({ error: "", redirect: true });
        this.props.onLogin();
      })
      .catch((fail) => {
        let error = getFirstError(fail);
        this.setState({ error: error });
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="Login-container">
          <input
            type="email"
            onChange={this.handleChange}
            name="email"
            placeholder="Email"
            className="Input"
          />
          {this.state.error ? (
            <div className="Error">
              <p>{this.state.error}</p>
            </div>
          ) : (
            ""
          )}
          <input
            type="password"
            onChange={this.handleChange}
            name="password"
            placeholder="Password"
            className="Input"
          />
          <button className="Button" onClick={this.login.bind(this)}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
