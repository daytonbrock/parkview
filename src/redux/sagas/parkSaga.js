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

function* parkSaga() {
    yield takeLatest('FETCH_PARKS_DATA', fetchParksData);
}

export default parkSaga;