export interface PostData {
	id?: string;
	user?: string;
	description?: string;
	timestamp?: string;
	likes?: number;
	comments?: number;
	commentsText?: Array<string>;
	userLikes?: Array<string>;
	media?: Array<string>;
	hashtags?: Array<string>;
}
