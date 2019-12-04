import {connect} from 'react-redux';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import css from './style.less';
import model from '../../models';


class Test extends Component {
    componentDidMount() {
        model.getInitData();
    }

    render() {
        const {data} = this.props;
        return (
            <div className={css.container}>
                <div className={css.header}>
                    <div className={css['h-ct']} onClick={() => model.getNumber()}>
                        <span className={css['h-title']}>test演示deliverer</span>
                    </div>
                </div>
                <div className={css.content}>
                    <div className={css.init}>{model.initData}</div>
                    <div className={css.button} onClick={model.getNumber}>调用getNumber方法</div>
                    <div className={css.number}>当前number值： <i>{data.number || '加载中...'}</i></div>
                </div>

            </div>
        );
    }
}
Test.propTypes = {
    data: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default connect(state => ({data: state[model.ns]}))(Test);
