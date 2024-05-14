import { Observer } from '../types/store';
import { Screens } from '../types/navigation';
import { reducer } from './reducer';

const emptyState = {
	screen: Screens.MAIN,
	user: {},
};

export let appState = emptyState;
let observers: Observer[] = [];
export const addObserver = (ref: Observer) => {
	let observers = [...observers, ref];
};
