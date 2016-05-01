#! /usr/bin/env node

var prompt = require('prompt');
var project_path = process.cwd();
var defaults = {
	name : project_path.slice(project_path.lastIndexOf('\/') + 1),
	version : "0.0.1",
	license : "ISC"
}
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
}
prompt.start();
prompt.get(schema, function(err, results){
	if(err){
		console.log(err);
		return;
	}
	var fs = require('fs');
	var project_path = process.cwd();
	var files = [{source: __dirname + '/../project_package.json', destination: 'package.json'}]

	files.forEach(function(file){
		var fileData = fs.readFileSync(file.source, "utf8"),
		start = fileData.indexOf('{{'),
		end = fileData.indexOf('}}', start);
		while(start != -1){
			var key = fileData.slice(start + 2, end);
			fileData = fileData.replace('{{' + key + '}}', '\"' + (results[key] || defaults[key] || '') + '\"');
			start = fileData.indexOf('{{'),
			end = fileData.indexOf('}}', start);
		}
		fs.writeFileSync(project_path + '/' + file.destination, fileData);
	})
	
	setupNodeModules();
})

function setupNodeModules(){
	var exec = require('child_process').exec;

	console.log("--------Setting up node modules ----------")
	var Spinner = require('cli-spinner').Spinner;
	var spinner = new Spinner('Please wait... %s');
	spinner.setSpinnerString('|/-\\');
	spinner.start();
	exec('npm install', function(err, stdout, stderr){
		console.log(stdout);
		spinner.stop(true)
		console.log('--------Node modules setup complete--------')
		
		console.log('Starting copying of files...')
		copyFiles();
	});
}

function copyFiles(){
	var ncp = require('ncp');
	var project_path = process.cwd();

	ncp(__dirname + '/../frontend', project_path+'/frontend/', function(err){
		if(err){
			console.log(err);
		}
		console.log("Copy app...Done");
	})

	ncp(__dirname + '/../server', project_path+'/server/', function(err){
		if(err){
			console.log(err);
		}
		console.log("Copy server...Done");
	})
	ncp(__dirname + '/../app.js', project_path+'/app.js', function(err){
		if(err){
			console.log(err);
		}
		console.log("Copy app.js ...Done");
	})
	ncp(__dirname + '/../webpack.config.js', project_path+'/webpack.config.js', function(err){
		if(err){
			console.log(err);
		}
		console.log("Copy webpack config ...Done");
	})
}

