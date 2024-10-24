import { isUserLoggedIn, userData } from '../composables/auth/user';

export default function isNotVerified() {
	if (process.client) {
		const loggedIn = isUserLoggedIn()
        if (loggedIn) {
            if (userData.value.email_verified_at === null) {
                return navigateTo('/auth/signup/otp')
            }else {
                return navigateTo('/dashboard')
            }
        }
	}
}