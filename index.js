require('es6-promise').polyfill();
require('isomorphic-fetch');
var objectAssign = require('object-assign');

function action (name, model, item){
	var that = this;
	var type = name, data;
	if(model){
		type += ('__' + model)
	}
	if(item && item.data){
		data = item.data;
		
	}
	return {type: type, data: data};
}

function makeRequest(url, settings){
	return fetch(url, settings).then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
}

function needsReq(item, state){
	var url = item.url,
		settings = item.reqSettings,
		checkType = item.checkType,
		name = item.name;
	if(checkType === "url"){
		return state.fetchedUrl.urls.indexOf(getRequestName(name, url, settings)) == -1;
	}
	return true;
}

const initialfetchedUrlState = {
	urls: []
}

const initialRequestProgressState = {}

function getRequestName(name, url, settings){
	return name || (url + JSON.stringify(settings));
}

module.exports = {
	action : function(name, model, item){
		return function(dispatch, getState){
			if(item.forceReq === true || (item.url && needsReq(item, getState()))){
				dispatch(action('ajaxRequest', 'cobalt', {data: {name: getRequestName(item.name, item.url, item.reqSettings) ,inProgress: true}}));
				makeRequest(item.url, item.reqSettings).then(function(data){
					if(!item.checkType || item.checkType == 'url'){
						dispatch(action('logURLFetched', 'cobalt', {data: {url: item.url, settings: item.reqSettings, name: item.name}}))
					}
					item.data = data;
					dispatch(action('ajaxRequest', 'cobalt', {data: {name: getRequestName(item.name, item.url, item.reqSettings) , inProgress: false}}));
					dispatch(action(name, model, item));
				})
			}
			else{
				dispatch(action(name, model, item));
			}
		}
	},
	fetchedUrlReducer: function(state = initialfetchedUrlState, action = {}) {
		switch (action.type) {
			case 'logURLFetched__cobalt':
				var newState = {urls: state.urls.concat(getRequestName(action.data.name, action.data.url, action.data.settings))}
				return  newState;
			default:
				return state;
		}
	},
	requestProgressReducer: function(state = initialRequestProgressState, action = {}) {
		switch (action.type) {
			case 'ajaxRequest__cobalt':
				var reqState = {}
				reqState[action.data.name] = action.data.inProgress;
				return objectAssign({}, state, reqState);
			default:
				return state;
		}
	}
}