import load from '~/common/load';

// const Demo = load(() => import('./'));
const Home = load(() => import(/* webpackChunkName: demo1_home */'./views/home'));
/* module.hot.accept('./views/home', () => {
    console.log('hello owrld');

}) */

export default {
    // component: Demo,
    childRoutes: [
        {
            path: 'home',
            component: Home,
        },
    ],
};
