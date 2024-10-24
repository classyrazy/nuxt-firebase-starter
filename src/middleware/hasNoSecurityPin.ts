import { isUserLoggedIn, userData } from '../composables/auth/user';

export default function hasNoSecurityPin() {
	if (process.client) {
		const loggedIn = isUserLoggedIn()
        if (loggedIn) {
            if (userData.value.security_pin === null) {
                return location.href = '/auth/signup/create-pin'
            }else {
                return location.href = '/dashboard'
            }
        }else {
            return navigateTo('/')
        }
	}
}