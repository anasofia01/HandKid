export const reducer = (action: any, preventState: any) => {
	switch (action.type) {
		case 'NAVIGATE':
			preventState.screen = action.payload;
			break;
	}
	return preventState;
};
