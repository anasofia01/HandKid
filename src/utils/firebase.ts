import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc } from 'firebase/firestore/lite';
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
		postArray.push(postInfo);
	});
	return postArray;
};
