import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { tag } = params;

	const response = await fetch(`https://pyramidb-be.vercel.app/api/characters/${tag}`);
	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}
	const data = await response.json();

	return { props: data.character };
}) satisfies PageServerLoad;
