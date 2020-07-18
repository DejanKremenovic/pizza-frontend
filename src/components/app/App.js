import React from 'react';
import './App.css';
import {Products} from '../products';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSingle: false
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>The Yummy pizza</h1>
        </header>
        <body>
          <div className="main-container">
            <Products/>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
