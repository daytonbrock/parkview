// src/redux/sagas/imagesSaga.js
import axios from 'axios';
import { all, put, takeLatest } from 'redux-saga/effects';

// this will make a GET request to retrieve all review images from the server
// then set the allImagesReducer with imagesResponse
function* fetchAllImages() {
    try {
        const imagesResponse = yield axios.get('api/images');
        yield put({ type: 'SET_ALL_IMAGES', payload: imagesResponse.data });
    } catch (error) {
        console.log('error with fetching review images from server:', error);
    }
}

function* imagesSaga() {
    yield takeLatest('FETCH_ALL_IMAGES', fetchAllImages);
}

export default imagesSaga;