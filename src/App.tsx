import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import { Home } from './Home';
import {QuestionList} from "./questions/QuestionList";
import {QuestionView} from "./questions/QuestionView";

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
            <Route exact path="/" children={<Home />} />
            <Route path="/questions/:questionId" children={<QuestionView />} />
            <Route path="/questions" children={<QuestionList />} />
          </Switch>
        </div>
      </Router>
  );
}
