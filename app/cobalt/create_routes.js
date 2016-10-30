var YAML = require('yamljs');
var fs = require('fs');
var shortid = require('shortid');

var nativeObjectRoutes = YAML.load('app/routes.yml');
var templateWrapper = fs.readFileSync('app/cobalt/template_wrapper.js', "utf8");

var importStatements = "";

var RELATIVE_PATH = '../modules/';
var setStatementTemplate = "that.setState({{set_object}})"

var routeComponentMap = "var componentRoutes =\n[\n";

function createUniqRouteIds(routeObject){
  routeObject.forEach(function(route){
    route.routeId = shortid.generate();
    if(route.children){
      createUniqRouteIds(route.children);
    }
  });
}

function getDependentImports(route, parentPath, lastRec){
  var folderPath = ((parentPath ? (parentPath + '/') : '') + route.folder);
  var file = route.file , selfRouteId = route.routeId;
  var selfFilePath = "\'" + RELATIVE_PATH + (folderPath ? (folderPath + '/') : '') + file + ".js\'";
  var requireFiles = selfFilePath + ",";

  var setStatements = (lastRec ? "{ components: { " : "") + "\'" + selfRouteId + "\':" + "require(" + selfFilePath + "),\n";

  if(route.children){
    route.children.forEach(function(route){
      var childImportObject = getDependentImports(route, folderPath , false);
      requireFiles += childImportObject.requireFiles;
      setStatements += childImportObject.setStatements;
    });
  }

  if(lastRec) {
    setStatements += "}}";
  }

  return {requireFiles: requireFiles, setStatements: setStatements};
}

createUniqRouteIds(nativeObjectRoutes);

nativeObjectRoutes.forEach(function(route){
  var wrapper = templateWrapper;
  var importObject = getDependentImports(route, '', true);
  var setStatements = setStatementTemplate.replace("{{set_object}}", importObject.setStatements) + "\n";

  var formattedWrapper = wrapper.replace("{{import_components}}", importObject.requireFiles);
  formattedWrapper = formattedWrapper.replace("{{import_component_set}}", setStatements);

  fs.writeFileSync('app/cobalt/' + route.file + 'Wrapper.js', formattedWrapper);

  importStatements += 'import ' + route.file + 'Wrapper from \'./' + route.file + 'Wrapper\';\n';
  routeComponentMap += '  {path: \'' + route.path + '\', component: ' + route.file + 'Wrapper' + ', routeId: \'' + route.routeId + '\' },\n'

});

routeComponentMap = routeComponentMap.slice(0, routeComponentMap.length - 2) + '\n];\n';

var index_file = fs.readFileSync('app/cobalt/index.js', "utf8");

var start = index_file.indexOf('/*********************    generated wrapper imports    *************************/') + 81,
    end = index_file.indexOf('/********************************************/');

index_file = index_file.slice(0, start) + '\n\n' + importStatements + '\n' + routeComponentMap + '\n' + index_file.slice(end); 

fs.writeFileSync('app/cobalt/index.js', index_file);
