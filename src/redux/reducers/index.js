import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import parksData from './parksDataReducer';
import reviews from './reviewsReducer';
import reviewDetails from './reviewDetailsReducer';
import uploadedImages from './uploadedImageReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  parksData, // will hold all of the parks data
  reviews, // this will hold the park reviews
  reviewDetails, // this will hold one reviews' details
  uploadedImages, // this will hold images to be added to DB when a new review is posted
});

export default rootReducer;
