// 如果是开发模式，store 采用此配置

import {createStore, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import deliverer from 'react-deliverer';

const store = createStore(
    () => {},
    window.__INITIAL_STATE__,
    compose(
        applyMiddleware(createLogger()),
    ),
);

const asyncReducers = {
};
deliverer(store, asyncReducers)
export default store;
