'use strict';

import path from 'path'
// import nodeExternals from 'webpack-node-externals'
import TerserPlugin from 'terser-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {

	entry: {common: './src/index.js'},

	devServer: {
		publicPath: '/',
		contentBase: path.join(__dirname, 'public'),
		port: 3000,
	},

	output: {
		path: path.resolve(__dirname, './public'),
		filename: 'order-widget_2.js'
	},

	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: true,
				// cache: true,
				parallel: true,
				// sourceMap: false,
				terserOptions: {

					extractComments: 'all',
					compress: {
						drop_console: true,
					},
				}
			}),
		],
	},

	module: {
		noParse: /es6-promise\.js$/,
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
			},
			{
				test: /\.ts$/,
				loader: 'ts-loader',
			},
			{
				test: /\.(c|s[ac])ss$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
					}
				]
			},
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './public', 'index.html'),
			inject: false
		})
	],
}
