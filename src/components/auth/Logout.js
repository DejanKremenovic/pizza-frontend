import React from "react";
// import { addToCart } from "../../actions/cartActions";
import { getFirstError } from "../../utils";
import { LogoutUser } from "../../actions/AuthActions";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  componentDidMount() {
    LogoutUser()
      .then(() => {
        localStorage.removeItem("token");
        this.setState({ redirect: true });
        this.props.onLogout();
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
        {this.state.error ? (
          <div className="Error">
            <p>{this.state.error}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Logout;
