import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Circle} from 'react-konva';
import {pointPropTypes} from '../types';

export const STATE_PROGRESS = 'progress';
export const STATE_INSIDE = 'inside';
export const STATE_OUTSIDE = 'outside';
export const STATE_ERROR = 'error';

export default class Point extends Component {

    static propTypes = pointPropTypes;

    static COLORS = {
        [STATE_PROGRESS]: 'gray',
        [STATE_INSIDE]: 'green',
        [STATE_OUTSIDE]: 'red',
        [STATE_ERROR]: 'black'
    };

    render() {
        const {x, y, state} = this.props;

        return (
            <Circle
                x={x}
                y={y}
                radius={5}
                fill={Point.COLORS[state]}
            />
        );
    }
}
