/* eslint-disable */
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ( env, options ) => {
	return {
        target: 'web',
        mode: process.env.NODE_ENV || 'development',
		entry: './src/pages/index/index.js',

        output: {
            path: path.resolve(__dirname, './output'),
            filename: '[name].[hash].js'
        },
		devtool: 'cheap-eval-source-map',
        resolve: {
            alias: {
                '@assets': path.resolve('src/assets'),
                '@components': path.resolve('src/components'),
                '@store': path.resolve('src/lib/Store.js'),
                '@app': path.resolve('src/lib/App.js')
            },
        },
		module: {
			rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.less$/i,
                    loader: [
                      MiniCssExtractPlugin.loader,
                      {
                          loader: 'css-loader',
                          options: {
                              sourceMap: true
                          }
                      },
                      'less-loader',
                    ],
                },
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								minimize: ( options.mode == 'production' ? true : false ),
								sourceMap: true,
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: [ require( 'autoprefixer' ) ]
							}
						},
					],
				},
				{
					test: /\.(png|jpg|gif)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'images/'
							}
						}
					]
				},
			],
		},

		plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/index.ejs'
            }),
			new MiniCssExtractPlugin({
				filename: '[name].[hash].css',
			})
		],

	}
};
