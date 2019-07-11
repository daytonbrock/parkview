// src/redux/reducers/uploadedImageReducer.js
// this will hold images to be added to DB with post of a new review
const uploadedImageReducer = (state = [], action) => {
    switch (action.type) {
        case 'CAPTURE_IMAGE':
            return [...state, action.payload];
        case 'CLEAR_IMAGES':
            return [];
        default:
            return state;
    }
}

// array of objects: images will be on redux store
export default uploadedImageReducer;