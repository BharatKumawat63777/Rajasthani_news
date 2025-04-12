// import logo from './logo.svg';
import "./App.css";
import React, { Component } from "react";
import NavBar from "./Component/NavBar.js";
import Shopping from "./Component/Shopping.js";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Shopping pageSize={6} country="in" category="general" />
      </div>
    );
  }
}
