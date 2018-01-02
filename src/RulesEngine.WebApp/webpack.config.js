const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './Scripts/app.ts',
    },
    resolve: {
        extensions: [".ts"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /nodes_modules/,
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'wwwroot/src/')
    }
};