import { Screens } from '../types/navigation';
import { getPosts, getFriends, getUserLogin } from '../utils/firebase';

export const navigate = (screen: Screens) => {
	return {
		type: 'NAVIGATE',
		payload: screen,
	};
};

export const setUserCredentials = (user: string) => {
	return {
		type: 'SETUSER',
		payload: user,
	};
};

export const getPostsAction = async () => {
	const post = await getPosts();
	return {
		type: 'GETPOSTS',
		payload: post,
	};
};

export const getFriendsAction = async () => {
	const userLogin = await getUserLogin();
	if (userLogin) {
		const friends = await getFriends(userLogin);
		return {
			type: 'GETFRIENDS',
			payload: friends,
		};
	}
};
