const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		watchContentBase: true,
		port: 4000
	},
	plugins: [
		// new BundleAnalyzerPlugin(),
		// new HtmlWebpackPlugin({
		// 	template: './assets/pug/index.pug',
		// 	minify: false,
		// 	hash: true
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'jobs.html',
		// 	template: './assets/pug/jobs.pug',
		// 	minify: false,
		// 	hash: true
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'basket.html',
		// 	template: './assets/pug/basket.pug',
		// 	minify: false,
		// 	hash: true
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'index-radio.html',
		// 	template: './assets/pug/index-radio.pug',
		// 	minify: false,
		// 	hash: true
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'brand.html',
		// 	template: './assets/pug/brand.pug',
		// 	minify: false,
		// 	hash: true
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'brands.html',
		// 	template: './assets/pug/brands.pug',
		// 	minify: false,
		// 	hash: true
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'kabinet.html',
		// 	template: './assets/pug/kabinet.pug',
		// 	minify: false,
		// 	hash: true
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'shares.html',
		// 	template: './assets/pug/shares.pug',
		// 	minify: false,
		// 	hash: true
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'share.html',
		// 	template: './assets/pug/share.pug',
		// 	minify: false,
		// 	hash: true
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'adjustable-page.html',
		// 	template: './assets/pug/adjustable-page.pug',
		// 	minify: false,
		// 	hash: true
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'main.html',
		// 	template: './assets/pug/main.pug',
		// 	minify: false,
		// 	hash: true
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'contacts.html',
		// 	template: './assets/pug/contacts.pug',
		// 	minify: false,
		// 	hash: true
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: '404.html',
		// 	template: './assets/pug/404.pug',
		// 	minify: false,
		// 	hash: true
		// }),
		new HtmlWebpackPlugin({
			filename: 'catalog-sub.html',
			template: './assets/pug/catalog-sub.pug',
			minify: false,
			hash: true
		}),
		new HtmlWebpackPlugin({
			filename: 'catalog-sub-graphic.html',
			template: './assets/pug/catalog-sub-graphic.pug',
			minify: false,
			hash: true
		}),
		new FileManagerPlugin({
			onEnd: {
				copy: [
					{source: 'public', destination: 'docs'}
				]
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: [{
					loader: 'pug-loader',
					options: {
						pretty: true
					}
				}]
			},
		]
	}
})