import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Layer, Stage, Circle} from 'react-konva';
import {actions, connect} from 'mirrorx'
import {scenePropTypes} from '../types';
import Point from './point';

@connect((state) => ({
    scene: state.scene
}))
export default class Scene extends Component {

    static propTypes = {
        scene: scenePropTypes.isRequired
    };

    componentDidMount() {
        const height = window.innerHeight;
        const width = window.innerWidth;

        actions.scene.loadCircle({height, width});
    };

    render() {
        const {scene} = this.props;

        let content;

        if (scene.isProgress) {
            content = Scene.renderProgress();
        } else if (scene.isError) {
            content = Scene.renderError();
        } else {
            content = this.renderScene();
        }

        return (
            <div>
                {content}
            </div>
        );
    }

    renderScene() {
        const {points, circle} = this.props.scene;

        const height = window.innerHeight;
        const width = window.innerWidth;

        const cursorSize = 10;

        return (
            <div onClick={
                ({pageX, pageY}) => actions.scene.checkPoint(
                    {
                        circle,
                        point: {
                            x: pageX - cursorSize,
                            y: pageY - cursorSize
                        }
                    }
                )
            }>
                <Stage width={width} height={height}>
                    <Layer>
                        {
                            <Circle
                                x={circle.point.x}
                                y={circle.point.y}
                                radius={circle.radius}
                                stroke='black'
                            />
                        }
                        {
                            points.map((point, index) => {
                                return (
                                    <Point
                                        x={point.x}
                                        y={point.y}
                                        state={point.state}
                                        key={index}
                                    />
                                );
                            })
                        }
                    </Layer>
                </Stage>
            </div>
        );
    }

    static renderProgress() {
        return (
            <div>
                Progress
            </div>
        );
    }

    static renderError() {
        return (
            <div>
                Error
            </div>
        );
    }
}
