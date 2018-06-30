#! /usr/bin/env node

var program = require('commander'),
		exec = require('child_process').exec,
		prompt = require('prompt'),
		fs = require('fs'),
		Spinner = require('cli-spinner').Spinner,
		ncp = require('ncp'),
		path = require('path');

program
  .version('0.0.1')
  .parse(process.argv);

program.args.forEach(function(arg, index){
	switch(arg){
		case 'init':
				initCobalt(program.args[index + 1]);
				break;
		case 'start':
				startCobalt()
	}
});

function startCobalt(){
	var startScript = exec('npm start');
	startScript.stdout.pipe(process.stdout)
}

function initCobalt(demoArg){
	prompt.message = "";
	var project_path = process.cwd();
	var defaults = {
		name : project_path.slice(project_path.lastIndexOf('\/') + 1),
		version : "0.0.1",
		license : "ISC"
	};
	var schema = {
		properties:{
			name:{
				message: "Project Name (" + defaults.name + ")"
			},
			version: {
				message: "Version (" + defaults.version + ")"
			},
			description:{
				message: "Description"
			},
			test_command: {
				message: "Test Command"
			},
			keywords: {
				message: "Keywords"
			},
			author: {
				message: "Message"
			},
			license: {
				message: "License (" + defaults.license + ")"
			}
		}
	};

	fs.exists(project_path + '/package.json', function(exists){
		if(!exists){
			prompt.start();
			prompt.get(schema, function (err, results) {
				if (err) {
					console.log(err);
					return;
				}
				var project_path = process.cwd();
				var file = {source: path.join(__dirname, '../project/package.json'), destination: 'package.json'};

				var fileData = fs.readFileSync(file.source, "utf8"),
					start = fileData.indexOf('{{'),
					end = fileData.indexOf('}}', start);
				while (start !== -1) {
					var key = fileData.slice(start + 2, end);
					fileData = fileData.replace('{{' + key + '}}', '\"' + (results[key] || defaults[key] || '') + '\"');
					start = fileData.indexOf('{{'),
						end = fileData.indexOf('}}', start);
				}
				fs.writeFileSync(project_path + '/' + file.destination, fileData);

				setupNodeModules(demoArg);
			});
		} else {
			setupNodeModules(demoArg);
		}
	});

	function setupNodeModules(demoArg){
		console.log("--------Setting up node modules ----------");
		var spinner = new Spinner('Please wait... %s');
		spinner.setSpinnerString('|/-\\');
		spinner.start();
		exec('npm install', function(err, stdout, stderr){
			if(err){
				console.log(err);
				return;
			}
			console.log(stdout);
			spinner.stop(true);
			console.log('--------Node modules setup complete--------');

			copyFiles(demoArg);
		});
	}

	function copyFiles(demoArg){
		console.log('Starting copying of files...');
		var project_path = process.cwd(),
		copyItems = [
			{source: '/../app/cobalt', destination: '/app/cobalt/', notification: 'Copy cobalt generators...Done', notArgCondition: "demo"},
			{source: '/../project/example_routes.yml', destination: '/app/routes.yml', notification: 'Copy routes file...Done', notArgCondition: "demo"},

			{source: '/../app/', destination: '/app/', notification: 'Copy routes file...Done', argCondition : "demo"},
			{source: '/../project/routes.yml', destination: '/app/routes.yml', notification: 'Copy routes file...Done', argCondition : "demo"},

			{source: '/../server', destination: '/server/', notification: 'Copy server...Done'},
			{source: '/../app.js', destination: '/app.js', notification: 'Copy app.js ...Done'},
			{source: '/../project/index.dev.js', destination: '/index.dev.js', notification: 'Copy dev index config ...Done'},
			{source: '/../project/webpack.dev.config.js', destination: '/webpack.dev.config.js', notification: 'Copy dev webpack config ...Done'},
			{source: '/../project/webpack.config.js', destination: '/webpack.config.js', notification: 'Copy webpack config ...Done'},
			{source: '/../project/babelrc', destination: '/.babelrc', notification: 'Copy babelrc ...Done'},
			{source: '/../index.js', destination: '/node_modules/cobalt-js/index.js', notification: 'Copy cobalt package..Done'}
		];

		exec('mkdir node_modules/cobalt-js');
		exec('mkdir app');
		exec('mkdir app/models app/modules app/modules/fixed_components app/reducers app/scss');

		copyItems.forEach(function(item){
			if((!item.argCondition || item.argCondition === demoArg) && (!item.notArgCondition || item.notArgCondition !== demoArg)) {
				ncp(path.join(__dirname, item.source), path.join(project_path, item.destination), function (err) {
					if (err) {
						console.log(err);
					}
					console.log(item.notification);
				})
			}
		})
	}
}

