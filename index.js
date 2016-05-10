require('es6-promise').polyfill();
require('isomorphic-fetch');

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
	return fetch(url, settings)
	.then(function(response) {
		if (response.status >= 400) {
			throw new Error("Bad response from server");
		}
		//response.json()
		return {id: 1, name: 'Sujoy'};
	})
}

function needsReq(url, settings, checkType, state){
	if(checkType === "url"){
		return state.fetchedUrl.urls.indexOf(url + JSON.stringify(settings)) == -1;
	}
	return true;
}

const initialfetchedUrlState = {
	urls: []
}

const initialRequestProgressState = {
	inProgress: false
}

module.exports = {
	action : function(name, model, item){
		return function(dispatch, getState){
			if(item.forceReq === true || (item.url && needsReq(item.url, item.reqSettings, item.checkType, getState()))){
				// TODO: Support for multiple requests
				dispatch(action('ajaxRequest', 'cobalt', {data: {inProgress: true}}));
				makeRequest(item.url, item.reqSettings).then(function(data){
					if(!item.checkType || item.checkType == 'url'){
						dispatch(action('logURLFetched', 'cobalt', {data: {url: item.url, settings: item.reqSettings}}))
					}
					item.data = data;
					dispatch(action('ajaxRequest', 'cobalt', {data: {inProgress: false}}));
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
				var newState = {urls: state.urls.concat(action.data.url + JSON.stringify(action.data.settings))}
				return  newState;
			default:
				return state;
		}
	},
	requestProgressReducer: function(state = initialRequestProgressState, action = {}) {
		switch (action.type) {
			case 'ajaxRequest__cobalt':
				var newState = {inProgress: action.data.inProgress}
				return  newState;
			default:
				return state;
		}
	}
}