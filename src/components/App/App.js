import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import HomePage from '../HomePage/HomePage';
import NewReviewPage from '../NewReviewPage/NewReviewPage';
import ReviewDetailsPage from '../ReviewDetailsPage/ReviewDetailsPage';

import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* KEEP THIS */}
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* KEEP THIS, POPULATE IT WITH PARKVIEW ABOUT INFO */}
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* GENERAL INFO HERE ABOUT PROTECTED ROUTES */}
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            {/* <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            /> */}
            {/* PROBABLY WILL ULTIMATELY DELETE THIS, LEAVE FOR NOW */}
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            {/* The new "HomePage" that will display all the reviews from the database, avail to view w/o signing in */}
            <Route
              exact
              path="/home"
              component={HomePage}
            />
            {/* Users are allowed to leave anonymous reviews without signing for base mode */}
            <Route
              exact
              path="/new-review"
              component={NewReviewPage}
            />
            {/* Users will be allowed to click and view a reviews details without signing in */}
            <Route
              exact
              path="/review-details/:id"
              component={ReviewDetailsPage}
            />
            {/* for login / register page */}
            <ProtectedRoute
              exact
              path="/home/verified"
              component={HomePage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
