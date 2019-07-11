// src/redux/reducers/allImagesReducer.js
const initialState = {
    "id": 0,
    "name": "",
    "url": "",
    "review_id": ""
}

// stores all review images
const allImagesReducer = (state = [initialState], action) => {
    switch (action.type) {
        case 'SET_ALL_IMAGES':
            return action.payload;
        default:
            return state;
    }
}

export default allImagesReducer;