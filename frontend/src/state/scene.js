import mirror, {actions} from 'mirrorx'
import {executeCheckPointRequest, executeLoadCircleRequest} from '../service/circle';
import {STATE_ERROR, STATE_INSIDE, STATE_OUTSIDE, STATE_PROGRESS} from '../component/point';

export default function () {
    mirror.model({
        name: 'scene',
        initialState: {
            isProgress: true,
            isError: false,
            circle: null,
            points: []
        },
        reducers: {
            addPoint(state, point) {
                return {
                    ...state,
                    points: [
                        ...state.points,
                        point
                    ]
                };
            },
            setCircle(state, circle) {
                return {
                    ...state,
                    isProgress: false,
                    isError: false,
                    circle: circle
                };
            },
            setProgress(state) {
                return {
                    ...state,
                    isProgress: true,
                    isError: false
                };
            },
            setError(state) {
                return {
                    ...state,
                    isProgress: false,
                    isError: true
                };
            }
        },
        effects: {
            async loadCircle({height, width}) {
                actions.scene.setProgress();

                let jsonResult;

                try {
                    jsonResult = await executeLoadCircleRequest(height, width);
                } catch (exception) {
                    console.error(exception.stack);
                    actions.scene.setError();
                    return;
                }

                actions.scene.setCircle(jsonResult);
            },
            async checkPoint({circle, point}) {
                actions.scene.addPoint({
                    ...point,
                    state: STATE_PROGRESS
                });

                let jsonResult;

                try {
                    jsonResult = await executeCheckPointRequest(circle, point);
                } catch (exception) {
                    console.error(exception.stack);
                    actions.scene.addPoint({
                        ...point,
                        state: STATE_ERROR
                    });
                    return;
                }

                actions.scene.addPoint({
                    ...point,
                    state: jsonResult.inside ? STATE_INSIDE : STATE_OUTSIDE
                });
            }
        }
    });
}
