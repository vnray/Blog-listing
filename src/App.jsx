import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Store } from './store/Store';
import BlogList from './pages/BlogList';
import BlogDetails from './pages/BlogDetails';

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/" component={BlogList} />
            <Route path="/blog/:id" component={BlogDetails} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;