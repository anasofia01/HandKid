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
} from 'firebase/firestore/lite';
import { PostData } from '../types/postData';
import { UserData } from '../types/userData';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	setPersistence,
	browserLocalPersistence,
	signOut,
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

export const getPosts = async (): Promise<PostData[]> => {
	const posts = await getDocs(postDocument);
	const postArray: PostData[] = [];
	posts.docs.forEach((doc) => {
		const postInfo = doc.data() as PostData;
		postInfo.id = doc.id;
		postArray.push(postInfo);
	});
	return postArray;
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

export const addCommentToPost = async (postId: string, newComment: string) => {
	const commentReference = doc(db, 'post', postId);
	await updateDoc(commentReference, {
		commentsText: arrayUnion(newComment),
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
				alert('Este correo ya esta en uso');
			} else if (firebaseError.code === 'auth/invalid-email') {
				alert('El correo no es valido');
			} else if (firebaseError.code === 'auth/weak-password') {
				alert('La contraseña es debil');
			} else {
				alert('Algo salió mal' + firebaseError);
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
		alert('La sesión se ha cerrado');
		return true;
	} catch (error) {
		alert('Hubo un error al cerrar la sesión');
		return false;
	}
};

export const getUserLogin = async (): Promise<string | false> => {
	if (auth.currentUser) {
		const uid = auth.currentUser.uid;
		return uid;
	} else {
		return false;
	}
};
