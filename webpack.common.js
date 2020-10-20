const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
	entry: {
		script: ['./assets/js/index.js', './assets/scss/index.scss']
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'public')
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.join(__dirname, 'assets'),
			'@js': path.join(__dirname, 'assets/js'),
			'~': path.join(__dirname, 'node_modules')
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/style.css'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery'
		})
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				include: [
				    path.resolve(__dirname, "assets/scss")
				],
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "../"
						}
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: !isProd,
							url: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: !isProd,
							outputStyle: !isProd ? 'expanded' : 'compressed'
						}
					}
				]
			},
			{
				test: /\.(svg|png|jpe?g|gif)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[folder]/[name].[ext]',
						outputPath: 'img'
					}
				}],
			},
			{
				test: /\.(woff2?|eot|ttf|otf)$/,
				use: [ {
					loader: 'file-loader',
					options:{
						name: '/fonts/[name].[ext]'
					}
				}],

			}
			
		]
	}
}