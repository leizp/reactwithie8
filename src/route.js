/**
 *  此文件不需要做任何修改了
 */
import React from 'react';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import {combineReducers} from 'redux';

const configureStore = require('./store/configureStore');

/**
 * 用于恢复之前状态用的， 此处可以不用干掉， 保留
 */
const store = configureStore(window.__INITIAL_STATE__);

/**
 * 自动注入 reducer
 * @param key
 * @param reducer
 */
export const injectReducer = ({ key, reducer }) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
    store.asyncReducers[key] = reducer;
    store.replaceReducer(combineReducers({
        ...store.asyncReducers,
    }));
}

const views = [];
((r) => {
    r.keys().forEach((key) => {
        views.push(r(key));
    });
})(require.context('./modules', true, /\.\/[^\/]+\/index.js$/)); // eslint-disable-line

const routeConfig = {
    path: '/',
    childRoutes: views,
};

// 通过Router配置上hashHistory和route
// 再用reactRedux.provider将Router包含起来
// 注册再reactRedux.provider上的store将和router中的所有component联系起来
export default function () {
    return (<Provider store={store}>
        <Router history={hashHistory} routes={routeConfig} />
    </Provider>);
}

