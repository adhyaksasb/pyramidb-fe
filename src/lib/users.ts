import { user } from '../stores/userStore';

// Function to fetch user info
export async function fetchUserInfo() {
	try {
		const response = await fetch('https://pyramidb-be.vercel.app/api/me', {
			credentials: 'include'
		});

		if (response.ok) {
			const data = await response.json();
			user.set(data.user); // Update the user store with the fetched info
		} else {
			user.set(null); // Clear user info on failure
		}
	} catch (error) {
		console.error('Failed to fetch user info:', error);
		user.set(null); // Clear user info on error
	}
}
