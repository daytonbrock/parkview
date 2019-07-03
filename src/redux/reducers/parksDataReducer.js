const parksDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARKS_DATA':
            return action.payload;
        default:
            return state;
    }
}

// array of objects: parksData will be on redux store
export default parksDataReducer;