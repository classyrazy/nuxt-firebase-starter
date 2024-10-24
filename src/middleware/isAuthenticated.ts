import { isUserLoggedIn, userData } from '../composables/auth/user';

export default function isAuthenticated() {
	if (process.client) {
		const loggedIn = isUserLoggedIn()
        if (!loggedIn) {
            return navigateTo('/')
        }else if (userData.value.email_verified_at === null) {
            return navigateTo('/auth/signup/otp')
        }else if (userData.value.security_pin === null) {
            return location.href = '/auth/signup/create-pin'
        }
	}
}