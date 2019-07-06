// src/redux/sagas/parkSaga.js
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchParksData() {
    try {
        const response = yield axios.get('/api/parks');
        yield put({
            type: 'SET_PARKS_DATA', 
            payload: response.data
        });
    } catch (error) {
        console.log('Error with retrieving parks data:', error);
    }
}

function* searchParks(action) {
    try {
        const searchResponse = yield axios.get(`api/parks/search?search=${action.payload}`);
        yield put({
            type: 'SET_PARKS_DATA',
            payload: searchResponse.data,
        });
    } catch (error) {
        console.log('Error with searching parks data:', error);
    }
}

function* parkSaga() {
    yield takeLatest('FETCH_PARKS_DATA', fetchParksData);
    yield takeLatest('SEARCH_PARKS', searchParks);
}

export default parkSaga;