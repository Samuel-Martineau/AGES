// export interface UserData {
// 	username: string;
// }
// export const UserData = {} as UserData;

export interface GameData {
	started: boolean;
	host: string;
	players: Record<
		string,
		{
			score: number;
			username: string;
			emoji: string;
			color: string;
		}
	>;
	round: {
		memeUrl: string;
		maker: 'ai' | string;
		laughedBy: string[];
		vomitedBy: string[];
		guessedBy: string[];
	}[];
}
