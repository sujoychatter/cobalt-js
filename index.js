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

function needsReq(url, params, checkType, state){
	if(checkType === "url"){
		return state.fetchedUrl.urls.indexOf(url) == -1;
	}
	return true;
}

const initialfetchedUrlState = {
	urls: []
}

module.exports = {
	action : function(name, model, item){
		return function(dispatch, getState){
			if(item.forceReq === true || (item.url && needsReq(item.url, item.params, item.checkType, getState()))){
				makeRequest(item.url, item.reqSettings).then(function(data){
					if(!item.checkType || item.checkType == 'url'){
						dispatch(action('logURLFetched', 'cobalt', {data: {url: item.url, settings: item.reqSettings}}))
					}
					item.data = data;
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
				var newState = {urls: state.urls.concat(action.data.url)}
				return  newState;
			default:
				return state;
		}
	}
}