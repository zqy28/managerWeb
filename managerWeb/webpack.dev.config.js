var path = require('path');
module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/index.js')
    },
    // 输出配置
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: '/',
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
        port: 7080,
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
    }
}