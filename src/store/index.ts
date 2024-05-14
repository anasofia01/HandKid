import { Observer } from '../types/store';
import { Screens } from '../types/navigation';
import { reducer } from './reducer';

const emptyState = {
	screen: Screens.MAIN,
	user: {},
};
