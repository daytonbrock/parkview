// src/redux/sagas/reviewSaga.js
import axios from 'axios';
import { all, put, takeLatest } from 'redux-saga/effects';

// this will make an axios POST request to the server 
// action.payload is a new review object
function* postParkReview(action) {
    try {
        yield axios.post('/api/review', action.payload);
        yield put({ type: 'FETCH_PARK_REVIEWS' });
    } catch (error) {
        console.log('Error with posting park review:', error);
    }
}

// this will make an axios POST request to the server to:
// post a review to "park_reviews" table and then
// post each affiliated image to the "images" table
// with the new review id
// action.payload is an object with the review and images
function* postReviewWithImages(action) {
    try {
        const reviewResponse = yield axios.post('/api/review', action.payload.review);
        yield all( action.payload.images.map( image => {
            axios.post('/api/images', {
                name: image.name,
                url: image.url,
                review_id: reviewResponse.data.id,
            });
        }));
        yield put({ type: 'CLEAR_IMAGES' });
        yield put({ type: 'FETCH_PARK_REVIEWS' });
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
// sending action.payload as a query string
// then set the reviewsReducer state to searchResponse.data
function* searchParkReviews(action) {
    try {
        console.log(action.payload);
        const searchResponse = yield axios.get(`/api/review/search?park_name=%${action.payload}%`);
        yield put({ type: 'SET_PARK_REVIEWS', payload: searchResponse.data });
    } catch (error) {
        console.log('Error with retrieving search:', error);
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
        yield axios.put(`/api/review/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_REVIEW_DETAILS', payload: action.payload.id });
    } catch (error) {
        console.log('Error with updating review details:', error);
    }
}

// this will make a DELETE request to the server to delete a review
// action.payload is the review id
function* deleteReview(action) {
    try {
        yield axios.delete(`api/images/${action.payload}`);
        yield axios.delete(`api/review/${action.payload}`);
        yield put({ type: 'FETCH_PARK_REVIEWS' });
    } catch (error) {
        console.log('Error with deleting review:', error);
    }
}

function* reviewSaga() {
    yield takeLatest('POST_PARK_REVIEW', postParkReview);
    yield takeLatest('POST_REVIEW_WITH_IMAGES', postReviewWithImages);
    yield takeLatest('FETCH_PARK_REVIEWS', fetchParkReviews);
    yield takeLatest('FETCH_REVIEW_DETAILS', fetchReviewDetails);
    yield takeLatest('UPDATE_REVIEW', updateReview);
    yield takeLatest('DELETE_REVIEW', deleteReview);
    yield takeLatest('SEARCH_PARK_REVIEWS', searchParkReviews);
}

export default reviewSaga;