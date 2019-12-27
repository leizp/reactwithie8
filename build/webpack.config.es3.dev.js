const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Es3ifyPlugin = require('es3ify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { getDirs, distDir, srcDir, staticDir } = require('./util');

module.exports = {
    entry: {
        entry: srcDir,
        vendor: ['es5-shim', 'es5-shim/es5-sham', 'console-polyfill', 'es6-promise', 'react', 'prop-types', 'react-dom', 'react-router', 'history', 'react-redux', 'redux', 'axios', 'classnames', 'react-deliverer', 'moment'],
    },
    output: {
        path: distDir,
        chunkFilename: '[id].chunk.js',
        filename: '[name].bundle.js',
        publicPath: '',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest'],
        }),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: 'modules_async',
            minChunks(module, count) {
                return module.resource && module.resource.indexOf('node_modules') > -1 && count > 1;
            },
        }),
        ...getDirs((path.join(srcDir, 'routes'))).map(dir => new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: `${dir}_async`,
            minChunks(module, count) {
                return module.resource && module.resource.indexOf(path.join('routes', dir)) > -1 && count > 1;
            },
        })),
        new Es3ifyPlugin(),
        new webpack.NoErrorsPlugin(),
        // 定义全局环境变量为开发环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
        new ExtractTextPlugin('style.all.css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${srcDir}/index.ejs`,
        }),
        new CopyWebpackPlugin([{ from: staticDir, to: distDir }]),
    ],
    resolve: {
        // 实际就是自动添加后缀，默认是当成js文件来查找路径
        // 空字符串在此是为了resolve一些在import文件时不带文件扩展名的表达式
        extensions: ['', '.js', '.jsx', '.json'],

        // 路径别名
        alias: {
            '~': srcDir,
        },
    },
    debug: true,
    // devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: ['babel-loader'],
            },
            {
                test: /\.(css|less)$/,
                include: /(node_modules|assets)/,
                loader: ExtractTextPlugin.extract('style-loader', 'css?modules&localIdentName=[local]!postcss-loader!less-loader'),
            },
            {
                exclude: /(node_modules|assets)/,
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css?modules&localIdentName=[local]-[hash:base64:5]!postcss-loader!less-loader'),
            },
            {
                test: /(fontawesome-webfont|glyphicons-halflings-regular)\.(woff|woff2|ttf|eot|svg)($|\?)/,
                loader: 'url?limit=1024&name=fonts/[name].[hash:10].[ext]',
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url?limit=10000&name=assets/[name].[hash:10].[ext]',
            },
        ],
    },
};
