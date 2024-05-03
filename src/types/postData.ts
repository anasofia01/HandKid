export interface PostData {
	user?: string;
	description?: string;
	timestamp?: string;
	likes?: number;
	comments?: number;
	media?: Array<string>;
	hashtags?: Array<string>;
}
