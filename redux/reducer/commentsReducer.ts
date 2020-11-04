
import * as ActionTypes from '../ActionTypes';

export const commentsReducer = (state = { errMess: null, comments: [] }, action: any) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return { ...state, errMess: null, comments: action.payload };
        case ActionTypes.COMMENTS_FAILED:
            return { ...state, errMess: action.payload };
        default:
            return state;
    }
};