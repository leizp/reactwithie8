import {connect} from 'react-redux';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import css from './style.less';
import model from '../../models';
import Radar from './../../components/Radar';

class Home extends Component {
    componentDidMount() {
        model.getInitData();

        // console.log(this.props);
    }
    render() {
        const {data} = this.props;
        return (
            <div className={css.container}>
                <div className={css.header}>
                    <div className={css['h-ct']} onClick={() => model.getNumber()}>
                        <span className={css['h-title']}>demo11355演示deliverer</span>
                    </div>
                </div>
                <div className={css.content}>
                    <div className={css.number} onClick={model.getNumber}>当前number值： <i>{data.number || '加载中...'}</i></div>
                    <Radar />
                </div>


            </div>
        );
    }
}
Home.propTypes = {
    history: PropTypes.shape({push: PropTypes.func}).isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default connect(state => ({data: state[model.ns]}))(Home);
let doReplace;
export const onUpdate = (cb) => {
    doReplace = cb;
};
if (module.hot) {
    module.hot.accept();
    if (module.hot.data && module.hot.data.update) {
        module.hot.data.update(module.exports);
    }
    module.hot.dispose(data => {
        data.update = doReplace || module.hot.data.update;
    });
}

