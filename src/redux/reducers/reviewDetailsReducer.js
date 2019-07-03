// // src/redux/reducers/reviewDetailsReducer.js

const initialDetails = {
    "id": 0,
    "user_id": "",
    "body": "",
    "park_name": ""
}

// stores details for a single review
const reviewDetailsReducer = (state = [initialDetails], action) => {
    switch (action.type) {
        case 'SET_REVIEW_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

export default reviewDetailsReducer;