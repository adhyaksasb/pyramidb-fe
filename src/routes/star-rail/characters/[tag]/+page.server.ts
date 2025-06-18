import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { tag } = params;

	const response = await fetch(`https://pyramidb-be.vercel.app/api/characters/${tag}`);

	const data = await response.json();

	if(!data.character) {
		throw error(404, 'Character Not Found');
	}

	return { props: data.character };
}) satisfies PageServerLoad;
