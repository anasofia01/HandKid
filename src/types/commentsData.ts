export interface CommentsData {
	idPost: string;
	avatar: string;
	name: string;
	username: string;
	description: string;
	timestamp: string;
	likes: number;
	comments: number;
	media: Array<string>;
	hashtags: Array<string>;
}
