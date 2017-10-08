const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename:'[name].css',
    disable: process.env.NODE_ENV === "development"
});


const config = {
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
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }],
                    fallback: 'style-loader'
                })
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)(\?.*)?$/, loader: 'url-loader?limit=100000' },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            { test: /\.json$/, loader: 'json-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            'jQuery': 'jquery'
        }),
        new webpack.DefinePlugin({
            'require.specified': 'require.resolve'
        }),
        extractSass
    ]
};

const serverConfig = Object.assign(config, {});

gulp.task('server', function(callback) {
    var server = new WebpackDevServer(webpack(serverConfig), {
        stats: {
            colors: true
        },
        historyApiFallback: true
    });

    server.listen(8080, 'localhost', function(err) {
        if(err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }

        gutil.log('[webpack-dev-server', 'http://localhost:8080');
    });
});

gulp.task('build', function(callback) {
    webpack(config, function(err, stats) {
        if(err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }

        gutil.log('[webapck]', stats.toString());
        callback();
    });
});

gulp.task('default', ['server']);