import { getWithExpiry, setWithExpiry } from './utils';

export const fetchUserInfo = async (token: string) => {
	try {
		const response = await fetch('https://pyramidb-be.vercel.app/api/me', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (response.ok) {
			const data = await response.json();
			setWithExpiry('user', data, 10080000); // Update the user store with the fetched info
		} else {
			getWithExpiry('user'); // Clear user info on failure
		}
	} catch (error) {
		console.error('Failed to fetch user info:', error);
		getWithExpiry('user'); // Clear user info on error
	}
};
