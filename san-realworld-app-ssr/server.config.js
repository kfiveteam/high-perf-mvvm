/* eslint-disable */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = ( env, options ) => {
	return {
        target: 'node',
        mode: process.env.NODE_ENV || 'development',
        externals: [nodeExternals()],
		entry: './src/server.js',

		output: {
			path: path.resolve( __dirname, 'output' ),
            libraryTarget: 'commonjs',
			filename: 'server.js',
		},
        node: {
            console: true,
            __dirname: true
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
        optimization: {
            // We no not want to minimize our code.
            minimize: false
        },
		module: {
			rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader'
                    },
                    exclude: /(node_modules|bower_components)/
                },
                {
                    test: /\.less$/i,
                    loader: [
                      {
                          loader: 'css-loader',
                          options: {
                              modules: {
                                  localIdentName: '[local]_[hash:base64:5]'
                              },
                              sourceMap: true
                          }
                      },
                      'less-loader',
                    ],
                },
				{
					test: /\.css$/,
					use: [
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								minimize: ( options.mode == 'production' ? true : false ),
								sourceMap: true,
							}
						}
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
		}
	}
};
