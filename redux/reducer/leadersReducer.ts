import * as ActionTypes from '../ActionTypes';

export const leadersReducer = (state = { isLoading: true, errMess: null, leaders: [] }, action: any) => {
    switch (action.type) {
        case ActionTypes.ADD_LEADERS:
            console.log("Done Loading ✨")
            return { ...state, isLoading: false, errMess: null, leaders: action.payload };
        case ActionTypes.LEADERS_LOADING:
            return { ...state, isLoading: true, errMess: null, leaders: [] }
        case ActionTypes.LEADERS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };
        default:
            return state;

    }
};