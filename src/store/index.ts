import { Observer } from '../types/store';
import { Screens } from '../types/navigation';
import { reducer } from './reducer';
import { auth } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setUserCredentials, navigate } from './actions';

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

onAuthStateChanged(auth, (user: any) => {
	if (user) {
		user.uid !== null ? dispatch(setUserCredentials(user.uid)) : '';
		dispatch(navigate(Screens.DASHBOARD));
	} else {
		dispatch(navigate(Screens.MAIN));
	}
});
