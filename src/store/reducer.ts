export const reducer = (action: any, preventState: any) => {
	switch (action.type) {
		case 'NAVIGATE':
			preventState.screen = action.payload;
			break;
		case 'SETUSER':
			preventState.user = action.payload;
			break;
		case 'GETPOSTS':
			preventState.post = action.payload;
			break;
	}
	return preventState;
};
