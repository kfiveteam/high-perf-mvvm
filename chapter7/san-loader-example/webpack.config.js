const HTMLWebpackPlugin = require('html-webpack-plugin');
const SanLoaderPlugin = require('san-loader/lib/plugin');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: false,
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.san$/,
                use: 'san-loader'
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]_[hash:base64:5]'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.san', '.json']
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, './index.html')
        }),
        new SanLoaderPlugin()
    ]
};
