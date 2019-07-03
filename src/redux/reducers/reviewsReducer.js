const reviewsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARK_REVIEWS':
            return action.payload;
        default:
            return state;
    }
}

// array of objects: parksData will be on redux store
export default reviewsReducer;