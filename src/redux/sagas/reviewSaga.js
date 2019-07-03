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

function* reviewSaga() {
    yield takeLatest('POST_PARK_REVIEW', postParkReviewToServer);
    yield takeLatest('FETCH_PARK_REVIEWS', fetchParkReviews);
}

export default reviewSaga;