
import React from 'react';
import { Router, hashHistory, BrowserHistory } from 'react-router';
import { Provider } from 'react-redux';


import TestPage from '~containers/evt';
import TestInfoPage from '~containers/evt/info';
import TestQuestionPage from '~containers/evt/question';
import TestHomePage from '~containers/evt/home';
import TestErrorPage from '~containers/evt/error';

import ReportClasses from '~containers/report/classes';
import ReportGrade from '~containers/report/grade';
import ReportStudent from '~containers/report/student';

const configureStore = require('./store/configureStore');

const store = configureStore(window.__INITIAL_STATE__)
// const store = configureStore(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


const routeConfig = {
    path: '/',
    childRoutes: [
        {
            path: 'evt',
            component: TestPage,
            childRoutes: [
                {
                    path: 'home',
                    component: TestHomePage,
                },
                {
                    path: 'error',
                    component: TestErrorPage,

                },
                {
                    path: 'info',
                    component: TestInfoPage,

                },
                {
                    path: 'question',
                    component: TestQuestionPage,

                },

            ]
        },
        {
            path: 'report',
            childRoutes: [
                {
                    path: 'grade',
                    component: ReportGrade,
                },
                {
                    path: 'classes',
                    component: ReportClasses,

                },
                {
                    path: 'student',
                    component: ReportStudent,

                },

            ]
        },

    ],
}

// 通过Router配置上hashHistory和route
// 再用reactRedux.provider将Router包含起来
// 注册再reactRedux.provider上的store将和router中的所有component联系起来
export default function () {
    return (<Provider store={store}>
        <Router history={hashHistory} routes={routeConfig} />
    </Provider>)
}

