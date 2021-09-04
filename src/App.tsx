import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import { Home } from './Home';
import {QuestionList} from "./questions/QuestionList";

export default function App() {
  return (
      <Router>
        <div className="container">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <NavLink exact className="nav-link" activeClassName="active" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/questions">Questions</NavLink>
            </li>
          </ul>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/questions">
              <QuestionList />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}
