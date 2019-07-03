// src/redux/sagas/parkSaga.js
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchParksData() {
    try {
        const response = yield axios.get('/api/parks');
        console.log(response)
        yield put({type: 'SET_PARKS_DATA', payload: response.data});
    } catch (error) {
        console.log('Error with retrieving parks data:', error);
    }
}

function* postParkReviewToServer(action) {
    try {
        yield axios.post('/api/parks', action.payload);
    } catch (error) {
        console.log('Error with posting park review:', error);
    }
}

function* parkSaga() {
    yield takeLatest('FETCH_PARKS_DATA', fetchParksData);
    yield takeLatest('POST_PARK_REVIEW', postParkReviewToServer);
}

export default parkSaga;