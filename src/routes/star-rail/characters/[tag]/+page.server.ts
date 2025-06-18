import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const { tag } = params;

	const res = await fetch(`https://pyramidb-be.vercel.app/api/characters/${tag}`);

	if (!res.ok) {
		const text = await res.text();
		console.error('API error:', res.status, text);
		throw error(res.status, 'Character not found');
	}
	
	const data = await res.json();

	if (!data.character) {
		throw error(404, 'Character Not Found');
	}

	return { character: data.character };
};