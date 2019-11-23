import {connect} from 'react-redux';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import load from '~/common/load';
import css from './style.less';
import store from '../../store';
// import Radar from "./Radar";

const Radar = load(() => import('./Radar'));


class Home extends Component {
    componentDidMount() {
        store.getInitData();
    }

    render() {
        return (
            <div className={css.container}>
                <div className={css.header}>
                    <div className={css['h-ct']} onClick={() => store.getNumber()}>
                        <span className={css['h-title']}>demo12演示deliverer</span>
                    </div>
                </div>
                <div className={css.content}>
                    <div className={css.number} onClick={() => this.props.history.push('/demo/test')}>当前number值： <i>{store.number || '加载中...'}</i></div>
                    <Radar />
                </div>


            </div>
        );
    }
}
Home.propTypes = {
    history: PropTypes.shape({push: PropTypes.func}).isRequired,
}
export default connect(state => ({state: state[store.ns]}))(Home);
