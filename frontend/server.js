const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const express = require('express');

const server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: [
        {
            path: '^\/(circle|)/',
            target: 'http://localhost:8000'
        }
    ]
});

const app = express();

app.get('/circle/', function (req, res) {
    const circle = {
        point: {
            x: 190,
            y: 135
        },
        radius: 100
    };

    res.json(circle);
});

app.post('/circle/', function (req, res) {
    setTimeout(function () {
        const inside = {
            inside: true
        };

        res.json(inside);
    }, 2000);
});

server.listen(3000, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }
    console.log('Listening at http://localhost:3000/');
});

app.listen(3001);
