// src/redux/sagas/imagesSaga.js
import axios from 'axios';
import { all, put, takeLatest } from 'redux-saga/effects';

function* fetchReviewImages() {
    try {
        const imagesResponse = yield axios.get('api/images');
        yield put({ type: 'SET_REVIEW_IMAGES', payload: imagesResponse.data });
    } catch (error) {
        console.log('error with fetching review images from server:', error);
    }
}

function* imagesSaga() {
    yield takeLatest('FETCH_ALL_IMAGES', fetchReviewImages);
}

export default imagesSaga;