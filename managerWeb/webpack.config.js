var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/index.js')
    },
    // 输出配置
    output: {
        path: path.resolve(__dirname, '../WebContent/assets/js'),
        publicPath: '/EventManager/assets/js',
        filename: 'manager.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    watch: true,
    resolve: {
        extensions: ['', '.js', '.css', '.scss']
    },
    devServer: {
        contentBase: "./", //资源位置
        colors: true,
        historyApiFallback: true,
        inline: true,
        open: true,
        port: 6080,
        hot: false
    },
    alias: {
        jquery: 'app/assets/jquery-vendor.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.scss$/,
            loader: "style!css!sass"
        }, {
            test: /\.html$/, loader: 'raw'
        }, {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader'
        }]
    },
    devtool: 'source-map',
    resolveLoader: {
        root: path.join(__dirname, "./node_modules")
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Event Manager',
            template: './main.html',
            filename: '../../main.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Event Manager',
            template: './index.html',
            filename: '../../index.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false
            }
        })
    ]
}