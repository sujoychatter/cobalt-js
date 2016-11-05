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

program.args.forEach(function(arg){
	switch(arg){
		case 'init':
				initCobalt();
				break;
		case 'start':
				startCobalt()
	}
});

function startCobalt(){
	exec('npm start');
	console.log("Server started at port 3000")
}

function initCobalt(){
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
				var file = {source: path.join(__dirname, '../project_package.json'), destination: 'package.json'};

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

				setupNodeModules();
			});
		} else {
			setupNodeModules();
		}
	});

	function setupNodeModules(){
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
			spinner.stop(true)
			console.log('--------Node modules setup complete--------');
			
			console.log('Starting copying of files...');
			copyFiles();
		});
	}

	function copyFiles(){
		
		var project_path = process.cwd(),
		copyItems = [
			{source: '/../app', destination: '/app/', notification: 'Copy app...Done'},
			{source: '/../server', destination: '/server/', notification: 'Copy server...Done'},
			{source: '/../app.js', destination: '/app.js', notification: 'Copy app.js ...Done'},
			{source: '/../project_index.dev.js', destination: '/index.dev.js', notification: 'Copy dev index config ...Done'},
			{source: '/../project_webpack.dev.config.js', destination: '/webpack.dev.config.js', notification: 'Copy dev webpack config ...Done'},
			{source: '/../project_webpack.config.js', destination: '/webpack.config.js', notification: 'Copy webpack config ...Done'},
			{source: '/../project_babelrc', destination: '/.babelrc', notification: 'Copy babelrc ...Done'},
			{source: '/../index.js', destination: '/node_modules/cobalt-js/index.js', notification: 'Copy cobalt package..Done'}
		];

		exec('mkdir node_modules/cobalt-js');

		copyItems.forEach(function(item){
			ncp(path.join(__dirname , item.source) , path.join(project_path , item.destination), function(err){
				if(err){
					console.log(err);
				}
				console.log(item.notification);
			})
		})
	}
}

