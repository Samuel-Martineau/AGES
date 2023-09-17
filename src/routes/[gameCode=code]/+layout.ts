import type { LayoutLoad } from './$types';
export const load: LayoutLoad = ({ params }) => {
	return {
		gameCode: params.gameCode
	};
};
