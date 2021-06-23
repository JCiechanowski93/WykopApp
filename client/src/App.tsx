import React, { Component } from 'react';
import './App.css';
const logo = require("./logo.svg") as string;
const Wykop = require('wykop-v2');

/*const wykop = new Wykop({
  // These are default values.
  appkey: 'gTt8NvjUNx',
  secret: 'gvVHpzw1xK',
  ssl: true,
  host: 'a2.wykop.pl',
  userAgent: `wykop-v2-js/dev`,
  errorTelemetry: true,
}); */

class App extends Component {
  state = {
    data: null,
    tagContent: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
    this.callWykopAPI()
      .then(res => this.setState({ tagContent: res }))
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
    const response = await fetch("https://a2.wykop.pl/Tags/Index/teczowepaski/1/appkey/aNd401dAPp");
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    // console.log(body.data);
    return body.data;
  };



  render() {

    const listItems = this.state.tagContent;
    if (listItems != null) {

    }

    return (
      <div className="App" >
        <header className="App-header" >
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title" > Welcome to React </h1>
        </header>
        <p className="App-intro" > {this.state.data} </p>
        {/* <p className="App-intro" > {this.state.tagContent} </p>*/}
      </div>
    );
  }
}

export default App;