const initialState = {
	items: []
}

export default function posts(state = initialState, action = {}) {
	switch (action.type) {
		case 'loadData__Post':
			var newPosts = []
			if(action.data){
				newPosts = action.data.posts;
			}
			var newItems = state.items.concat(newPosts);
			return Object.assign({}, {items: newItems});
		default:
			return state;
	}
}
