import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { datareducer } from './data.reducer'

export const rootReducer = composeReducers(
    defaultFormReducer(),
    combineReducers({
        datareducer: datareducer
    }));
