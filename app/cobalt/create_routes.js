var YAML = require('yamljs');
var fs = require('fs');

var nativeObjectRoutes = YAML.load('app/routes.yml');
var templateWrapper = fs.readFileSync('app/cobalt/template_wrapper.js', "utf8");

var importStatements = "";

var routeComponentMap = "var componentRoutes =\n[\n";

nativeObjectRoutes.forEach(function(route){
  var wrapper = templateWrapper;
  var start = wrapper.indexOf('{{component_name}}');
  while(start != -1){
    wrapper = wrapper.replace('{{component_name}}', route.file + '.js');
    start = wrapper.indexOf('{{component_name}}');
  }
  fs.writeFileSync('app/cobalt/' + route.file + 'Wrapper.js', wrapper);

  importStatements += 'import ' + route.file + 'Wrapper from \'./cobalt/' + route.file + 'Wrapper\';\n';
  routeComponentMap += '  {path: \'' + route.path + '\', component: ' + route.file + 'Wrapper },\n'

})

routeComponentMap = routeComponentMap.slice(0, routeComponentMap.length - 2) + '\n];\n';

var index_file = fs.readFileSync('app/index.js', "utf8");

var start = index_file.indexOf('/*********************    generated wrapper imports    *************************/') + 81,
    end = index_file.indexOf('/********************************************/');

index_file = index_file.slice(0, start) + '\n\n' + importStatements + '\n' + routeComponentMap + '\n' + index_file.slice(end); 

fs.writeFileSync('app/index.js', index_file);
