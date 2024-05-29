import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	getDoc,
	doc,
	setDoc,
	updateDoc,
	arrayUnion,
	onSnapshot,
} from 'firebase/firestore';
import { PostData } from '../types/postData';
import { UserData } from '../types/userData';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	setPersistence,
	browserLocalPersistence,
	signOut,
	sendPasswordResetEmail,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyADVrIwsy_xKZ_t5G56WxoSTFQ0WIIEn_g',
	authDomain: 'handkid-9eac8.firebaseapp.com',
	projectId: 'handkid-9eac8',
	storageBucket: 'handkid-9eac8.appspot.com',
	messagingSenderId: '86965795399',
	appId: '1:86965795399:web:8101cb26e97b582c6f4f62',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const postDocument = collection(db, 'post');

export const auth = getAuth(app);

const userDocument = collection(db, 'users');

export const createPost = async (data: PostData) => {
	await addDoc(postDocument, data);
};

export const getPosts = (callback: (posts: PostData[]) => void): (() => void) => {
	const result = onSnapshot(postDocument, (querySnapshot) => {
		const postArray: PostData[] = [];
		querySnapshot.forEach((doc: any) => {
			const postData = doc.data() as PostData;
			postData.id = doc.id;
			postArray.push(postData);
		});
		callback(postArray);
	});
	return result;
};

export const getLikesById = async (id: string): Promise<number | null> => {
	const postReference = doc(db, 'post', id);
	const postDoc = await getDoc(postReference);
	if (postDoc.exists()) {
		const postData = postDoc.data() as PostData;
		return postData.likes ?? 0;
	} else {
		return null;
	}
};

export const updateLikesById = async (id: string, newLikes: number): Promise<void> => {
	const postReference = doc(db, 'post', id);
	await updateDoc(postReference, {
		likes: newLikes,
	});
};

export const addCommentToPost = async (postId: string, newComment: string, userId: string) => {
	const commentReference = doc(db, 'post', postId);
	await updateDoc(commentReference, {
		commentsText: arrayUnion({
			text: newComment,
			userId: userId,
		}),
	});
};

export const getCommentsById = async (postId: string) => {
	const commentReferenceById = doc(db, 'post', postId);
	const postDoc = await getDoc(commentReferenceById);
	if (postDoc.exists()) {
		const postData = postDoc.data() as PostData;
		return postData.commentsText ?? [];
	} else {
		return null;
	}
};

export const getCommentById = async (id: string): Promise<number | null> => {
	const commentReferenceNumber = doc(db, 'post', id);
	const postDoc = await getDoc(commentReferenceNumber);
	if (postDoc.exists()) {
		const postData = postDoc.data() as PostData;
		return postData.comments ?? 0;
	} else {
		return null;
	}
};

export const updateCommentsById = async (id: string, newComments: number): Promise<void> => {
	const updateCommentsReference = doc(db, 'post', id);
	await updateDoc(updateCommentsReference, {
		comments: newComments,
	});
};

export const createUser = async (data: UserData) => {
	if (!data.email || !data.password) {
		console.error('El email y la password no llegaron, están vacíos');
		return false;
	} else {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
			const dataRegister = doc(db, 'users', userCredential.user.uid);
			const register = {
				email: data.email,
				password: data.password,
				fullname: data.fullname,
				username: data.username,
				birthdate: data.birthdate,
				avatar: data.avatar,
				banner: data.banner,
				friends: data.friends,
				age: data.age,
				policy: data.policy,
			};
			await setDoc(dataRegister, register);
			const loginResult = await login(data.email, data.password);
			if (!loginResult) {
				console.error('Falló');
				return false;
			}
			return true;
		} catch (error) {
			const firebaseError = error as {
				code?: string;
				message?: string;
			};
			if (firebaseError.code === 'auth/email-already-in-use') {
				alert('This Email is already in use');
			} else if (firebaseError.code === 'auth/invalid-email') {
				alert('The Email is not valid');
			} else if (firebaseError.code === 'auth/weak-password') {
				alert('The Password is weak');
			} else {
				alert('Something went wrong' + firebaseError);
			}
			return false;
		}
	}
};

export const login = async (email: string, password: string): Promise<boolean> => {
	try {
		await setPersistence(auth, browserLocalPersistence);
		const loginResults = await signInWithEmailAndPassword(auth, email, password);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const logout = async (): Promise<boolean> => {
	try {
		await signOut(auth);
		alert('The Session is closed');
		return true;
	} catch (error) {
		alert('There was an error while logging out');
		return false;
	}
};

export const getUserById = (id: string, callback: (userData: UserData | null) => void): (() => void) => {
	const docReference = doc(db, 'users', id);
	const result = onSnapshot(docReference, (docSnapshot) => {
		if (docSnapshot.exists()) {
			const userData = { idFriend: docSnapshot.id, ...docSnapshot.data() } as UserData;
			callback(userData);
		} else {
			callback(null);
		}
	});
	return result;
};

export const getFriends = async (idUserLogin: string): Promise<UserData[]> => {
	const friends = await getDocs(userDocument);
	const userArray: UserData[] = [];
	friends.docs.forEach((doc) => {
		if (doc.id !== idUserLogin) {
			const userInfo = doc.data() as UserData;
			userInfo.idFriend = doc.id;
			userArray.push(userInfo);
		}
	});
	return userArray;
};

export const checkedIfUserHasLike = async (postId: string, userId: string): Promise<boolean> => {
	const docReference = doc(db, 'post', postId);
	const postDoc = await getDoc(docReference);
	if (postDoc.exists()) {
		const postData = postDoc.data() as PostData;
		const userLike = postData.userLikes?.includes(userId);
		return userLike ? true : false;
	} else {
		return false;
	}
};

export const addUserLikedToPost = async (postId: string, userId: string) => {
	const docReference = doc(db, 'post', postId);
	await updateDoc(docReference, {
		userLikes: arrayUnion(userId),
	});
};

export const resetPassword = async (email: string): Promise<boolean> => {
	try {
		await setPersistence(auth, browserLocalPersistence);
		await sendPasswordResetEmail(auth, email);
		return true;
	} catch (error) {
		return false;
	}
};

export const checkedIfUserIsFriend = async (friendId: string, userId: string): Promise<boolean> => {
	const docReference = doc(db, 'users', friendId);
	const userDoc = await getDoc(docReference);
	if (userDoc.exists()) {
		const userData = userDoc.data() as UserData;
		const ifUserIdInList = userData.userFriends?.includes(userId);
		return ifUserIdInList ? true : false;
	} else {
		return false;
	}
};

export const addFriendToUser = async (friendId: string, userId: string) => {
	const docReference = doc(db, 'users', friendId);
	await updateDoc(docReference, { userFriends: arrayUnion(userId) });
};

export const getFriendsById = async (userId: string): Promise<number | null> => {
	const docReference = doc(db, 'users', userId);
	const userDoc = await getDoc(docReference);
	if (userDoc.exists()) {
		const userData = userDoc.data() as UserData;
		return userData.friends ?? 0;
	} else {
		return null;
	}
};

export const updateFriendsListById = async (userId: string, newFriends: number) => {
	const docReference = doc(db, 'users', userId);
	await updateDoc(docReference, { friends: newFriends });
};
