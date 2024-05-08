import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore/lite';
import { PostData } from '../types/postData';

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
