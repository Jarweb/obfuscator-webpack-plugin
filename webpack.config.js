const path = require('path')
const CodeObfuscatorWebpackPlugin = require('./src')

module.exports = {
	mode: "development",
	entry: {
		'dist': './example/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'example'),
		filename: '[name].hash.js'
	},
	plugins: [
		new CodeObfuscatorWebpackPlugin({
			// obfuscator default options
			options: {
				compact: true,
			},
			chunks: ['dist'],
		})
	]
}