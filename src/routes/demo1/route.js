import load from '~/common/load';

// const Demo = load(() => import('./'));
const Home = load(() => import(/* webpackChunkName: demo1_home */'./views/home'));
const Test = load(() => import(/* webpackChunkName: demo1_test */'./views/test'));

export default {
    // component: Demo,
    childRoutes: [
        {
            path: 'home',
            component: Home,
        },
        {
            path: 'test',
            component: Test,
        },
    ],
};