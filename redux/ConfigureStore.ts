import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { leadersReducer } from './reducer/leadersReducer';
import { dishesReducer } from './reducer/dishesReducer';
import { commentsReducer } from './reducer/commentsReducer'

import { promotionsReducer } from './reducer/promotionsReducer'
import { favoritesReducer } from './reducer/favoritesReducer'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({ leadersReducer, dishesReducer, commentsReducer, promotionsReducer, favoritesReducer }),
        applyMiddleware(thunk, logger)
    );
    return store;
};