import { Observer } from '../types/store';
import { Screens } from '../types/navigation';
import { reducer } from './reducer';
import { auth } from '../utils/firebase';

const emptyState = {
	screen: Screens.MAIN,
	user: {},
};

export let appState = emptyState;
let observers: Observer[] = [];
export const addObserver = (ref: Observer) => {
	observers = [...observers, ref];
};

const notifyObservers = () => observers.forEach((o) => o.render());

export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	const newState = reducer(action, clone);
	appState = newState;
	notifyObservers();
};
