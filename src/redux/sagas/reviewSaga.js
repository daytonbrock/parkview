import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postParkReviewToServer(action) {
    try {
        yield axios.post('/api/review', action.payload);
    } catch (error) {
        console.log('Error with posting park review:', error);
    }
}

function* fetchParkReviews() {
    try {
        const response = yield axios.get('/api/review');
        yield put({ type: 'SET_PARK_REVIEWS', payload: response.data });
    } catch (error) {
        console.log('Error with retrieving park reviews:', error);
    }
}

function* fetchReviewDetails(action) {
    try {
        const response = yield axios.get(`/api/review/details/${action.payload}`);
        yield put({ type: 'SET_REVIEW_DETAILS', payload: response.data[0] });
    } catch (error) {
        console.log('Error with retrieving review details:', error);
    }
}

function* reviewSaga() {
    yield takeLatest('POST_PARK_REVIEW', postParkReviewToServer);
    yield takeLatest('FETCH_PARK_REVIEWS', fetchParkReviews);
    yield takeLatest('FETCH_REVIEW_DETAILS', fetchReviewDetails);
}

export default reviewSaga;