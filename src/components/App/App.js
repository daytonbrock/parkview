// src/components/app/app.js
import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Static header and footer
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

// ProtectedRoute to filter users to log in page if the route is not public
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

// Components
import AboutPage from '../AboutPage/AboutPage';
// import UserPage from '../UserPage/UserPage'; --> will be used after base mode with introduction of user registration / profiles
// import InfoPage from '../InfoPage/InfoPage'; --> not currently used, may need to be deleted
import HomePage from '../HomePage/HomePage';
import NewReviewPage from '../NewReviewPage/NewReviewPage';
import ReviewDetailsPage from '../ReviewDetailsPage/ReviewDetailsPage';
import EditReviewPage from '../EditReviewPage/EditReviewPage';

// App styles
import './App.css';

// Material UI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

class App extends Component {

  THEME=createMuiTheme({
    typography: {
      "fontFamily": "\"Lato\", sans-serif",
    }
  });

  // fetch user on page load
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={this.THEME}>
          <div>
            <Nav />
            <Switch>
              {/* Visiting '/' will redirect to '/home' */}
              <Redirect exact from="/" to="/home" />
              {/* BASE MODE: this will explain the app */}
              {/* Visiting '/about' will show the public about page. */}
              <Route
                exact
                path="/about"
                component={AboutPage}
              />
              {/* AFTER BASE MODE: if user is logged in, this will show the user page. */}
              {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/home will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
              Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              {/* <ProtectedRoute
                exact
                path="/home"
                component={UserPage}
              /> */}
              {/* NOT USED, MAYBE DELETE */}
              {/* This works the same as the other protected route, except that if the user is logged in,
              they will see the info page instead. */}
              {/* <ProtectedRoute
                exact
                path="/info"
                component={InfoPage}
              /> */}
              {/* BASE MODE: '/home' will show recent reviews */}
              {/* Visiting '/home' will show the home page */}
              <Route
                exact
                path="/home"
                component={HomePage}
              />
              {/* BASE MODE: users are allowed to leave reviews without signing in */}
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
              <ProtectedRoute
                exact
                path="/edit-review/:id"
                component={EditReviewPage}
              />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
            <Footer />
          </div>
        </MuiThemeProvider>
      </Router>
  )}
}

export default connect()(App);
