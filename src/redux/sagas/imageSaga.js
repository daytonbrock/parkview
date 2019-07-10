// src/redux/sagas/imageSaga.js
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* captureImages(action) {
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
    yield takeLatest('CAPTURE_IMAGES', captureImages);
}

export default parkSaga;