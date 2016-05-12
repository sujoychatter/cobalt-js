const initialState = {
	items: [],
}

export default function posts(state = initialState, action = {}) {
	switch (action.type) {
		case 'loadData__Post':
			var newItems = state.items.concat(action.data.posts);
			return Object.assign({}, {items: newItems});
		default:
			return state;
	}
}
