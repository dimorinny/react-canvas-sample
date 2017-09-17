import React from 'react';
import {render} from 'mirrorx'
import Scene from './component/scene';
import sceneState from './state/scene';

sceneState();

render(
    <Scene/>,
    document.getElementById('root')
);
