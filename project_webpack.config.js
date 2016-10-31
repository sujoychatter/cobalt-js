module.exports = {
	entry: './app/cobalt/index.js',

	output: {
		filename: 'bundle.js',
		path: './public'
	},

	module: {
		loaders: [
		  { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-2' },
			{ test: /\.scss$/, loaders: ["style", "css", "sass"] }
		]
	}
}