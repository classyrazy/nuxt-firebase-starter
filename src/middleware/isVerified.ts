import { isUserLoggedIn, userData } from '../composables/auth/user';

export default function isVerified() {
	if (process.client) {
		const loggedIn = isUserLoggedIn()
        if (loggedIn && userData.value.email_verified_at !== null) {
            return navigateTo('/dashboard')
        }
	}
}