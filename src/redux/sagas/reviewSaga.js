// src/redux/sagas/reviewSaga.js
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// this will make an axios POST request to the server 
// action.payload is a new review object
function* postParkReview(action) {
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
function* updateReview(action) {
    try {
        yield axios.put(`/api/review/update/${action.payload.id}`, action.payload);
    } catch (error) {
        console.log('Error with updating review details:', error);
    }
}

// this will make a DELETE request to the server to delete a review
// action.payload is an object with the review id and user id
function* deleteReview(action) {
    try {
        yield axios.delete(`api/review/delete`, action.payload);
        yield put({ type: 'FETCH_PARK_REVIEWS' });
    } catch (error) {
        console.log('Error with deleting review:', error);
    }
}

function* reviewSaga() {
    yield takeLatest('POST_PARK_REVIEW', postParkReview);
    yield takeLatest('FETCH_PARK_REVIEWS', fetchParkReviews);
    yield takeLatest('FETCH_REVIEW_DETAILS', fetchReviewDetails);
    yield takeLatest('UPDATE_REVIEW', updateReview);
    yield takeLatest('DELETE_REVIEW', deleteReview);
}

export default reviewSaga;