import React, { Component } from "react";
import logo from "./logo.svg";
import "./app/App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <input type="text" placeholder="Enter title, author, etc" />
      </div>
    );
  }
}

export default App;
