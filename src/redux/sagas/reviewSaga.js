// src/redux/sagas/reviewSaga.js
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// this will make an axios POST request to the server 
// action.payload is a new review object
function* postParkReviewToServer(action) {
    try {
        yield axios.post('/api/review', action.payload);
    } catch (error) {
        console.log('Error with posting park review:', error);
    }
}

// this will make a GET request to the server
// then set the reviewsReducer state to the array of objects that is response.data
function* fetchParkReviews() {
    try {
        const response = yield axios.get('/api/review');
        yield put({ type: 'SET_PARK_REVIEWS', payload: response.data });
    } catch (error) {
        console.log('Error with retrieving park reviews:', error);
    }
}

// this will make a GET request to the server
// then set the reviewDetailsReducer to the object that is response.data[0]
function* fetchReviewDetails(action) {
    try {
        const response = yield axios.get(`/api/review/details/${action.payload}`);
        yield put({ type: 'SET_REVIEW_DETAILS', payload: response.data[0] });
    } catch (error) {
        console.log('Error with retrieving review details:', error);
    }
}

// this will make a PUT request to the server to update the review details
// action.payload is an object
function* updateReviewDetails(action) {
    try {
        yield axios.put(`/api/review/update/${action.payload.id}`, action.payload);
    } catch (error) {
        console.log('Error with updating review details:', error);
    }
}

function* reviewSaga() {
    yield takeLatest('POST_PARK_REVIEW', postParkReviewToServer);
    yield takeLatest('FETCH_PARK_REVIEWS', fetchParkReviews);
    yield takeLatest('FETCH_REVIEW_DETAILS', fetchReviewDetails);
    yield takeLatest('UPDATE_REVIEW', updateReviewDetails);
}

export default reviewSaga;