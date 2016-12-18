import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers'

const middleware = applyMiddleware(promiseMiddleware());

export default createStore(reducers, middleware);