import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./styles.css";

import Create from "./components/Create";
import List from "./components/List";
import Get from "./components/Get";
import Delete from "./components/Delete";

export default function App() {
  return (
    <div className="app">
      <h1>Formstack Documents</h1>
      <Router>
        <nav>
          <ul>
            <li>
              <NavLink exact to="/">
                Create
              </NavLink>
            </li>
            <li>
              <NavLink to="/get-document">Get</NavLink>
            </li>
            <li>
              <NavLink to="/get-list">Get List</NavLink>
            </li>
            <li>
              <NavLink to="/delete">Delete</NavLink>
            </li>
          </ul>
          <Route exact path="/" component={Create} />
          <Route exact path="/get-list" component={List} />
          <Route exact path="/get-document" component={Get} />
          <Route exact path="/delete" component={Delete} />
        </nav>
      </Router>
    </div>
  );
}
