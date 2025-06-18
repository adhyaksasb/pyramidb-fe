import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const { tag } = params;

	console.log('Fetching character for tag:', tag);

	const res = await fetch(`https://pyramidb-be.vercel.app/api/characters/${tag}`);
	const data = await res.json();

	console.log('Fetched data:', data);

	if (!data.character) {
		throw error(404, 'Character Not Found');
	}

	return { character: data.character };
};