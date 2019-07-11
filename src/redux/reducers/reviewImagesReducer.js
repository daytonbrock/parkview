// src/redux/reducers/reviewImagesReducer.js
const initialState = {
    "id": 0,
    "name": "",
    "url": "",
    "review_id": ""
}

// stores review images
const reviewImagesReducer = (state = [initialState], action) => {
    switch (action.type) {
        case 'SET_REVIEW_IMAGES':
            return action.payload;
        default:
            return state;
    }
}

export default reviewImagesReducer;