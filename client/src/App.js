import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
    this.callWykopAPI()
      .then(res => this.setState({ profileData: res }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    } 
    return body;
  };

  callWykopAPI = async () => {
    const response = await fetch("https://a2.wykop.pl/Profiles/Index/Szuwar/YNiYyE5TqW/K3lyxwfeMI");
    const body = await response.json(); 
    if (response.status !== 200) {
      throw Error(body.message) 
    } 
    console.log(body);
    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.data}</p>
      </div>
    );
  }
}

export default App;