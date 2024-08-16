export type Achievement = {
	Desc: string;
	Hide: boolean;
	ID: number;
	Rarity: string;
	RelationID: number;
	Reward: number;
	Series: string;
	Title: string;
	Version: string;
};

export type MergedAchievement = {
	RelationID: number;
	Achievements: Achievement[];
};
