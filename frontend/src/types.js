import {PropTypes} from 'prop-types';
import {STATE_PROGRESS, STATE_OUTSIDE, STATE_INSIDE, STATE_ERROR} from './component/point';

export const pointPropTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    state: PropTypes.oneOf(
        [STATE_PROGRESS, STATE_INSIDE, STATE_OUTSIDE, STATE_ERROR]
    ).isRequired
};

export const circlePropTypes = {
    point: pointPropTypes.isRequired,
    radius: PropTypes.number.isRequired
};


export const scenePropTypes = PropTypes.shape({
    isProgress: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    circle: PropTypes.shape(
        circlePropTypes.isRequired
    ),
    points: PropTypes.arrayOf(
        PropTypes.shape(pointPropTypes)
    ).isRequired
});
