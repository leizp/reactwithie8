import {Component} from 'react';
import PropTypes from 'prop-types';

export default class Cartoon extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    }
    render() {
        return this.props.children;
    }
}
