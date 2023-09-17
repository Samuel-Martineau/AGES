// export interface UserData {
// 	username: string;
// }
// export const UserData = {} as UserData;

export interface GameData {
	phase: 'lobby' | 'makeMeme' | 'find' | 'showMakers' | 'lead';
	host: string;
	roundMemes: Record<
		string,
		{
			memeUrl: string;
			laughedBy: string[];
			vomitedBy: string[];
			guessedBy: string[];
			randomKey: string;
		}
	>;
}

export interface PlayerData {
	score: number;
	previousScore: number;
	username: string;
	emoji: string;
	color: string;
	done: boolean;
}
