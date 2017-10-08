const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    context: path.resolve('src'),
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve('dist'),
        publicPath: path.resolve('/')
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                    
                })
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg)$/,
                use: "file-loader?name=/images/[name].[ext]"
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)(\?.*)?$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        extractSass,
        HtmlWebpackPluginConfig,
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    devServer: {
        historyApiFallback: true
    }
};