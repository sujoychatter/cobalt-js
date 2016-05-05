module.exports = {
	entry: './app/index.js',

	output: {
		filename: 'bundle.js',
		path: './public'
	},

	module: {
		loaders: [
		  { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-2' }
		]
	}
}