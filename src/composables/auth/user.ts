import { set, useStorage } from "@vueuse/core"
import SignOutModal from "../../components/modals/signoutModal.vue";
import { useModal } from '../../composables/core/useModal';
import { useAlert } from "../../composables/core/useToast";
import type { UserData } from "../auth/types";



export const userToken = useStorage('token', '')
export const userTokenVerified = useStorage('userToken', '')
export const userData = useStorage<Partial<UserData>>('user', {})
export const isUserLoggedIn = () => {
    return userToken.value !== '' && userData.value
}

export const setToken = (tokenData: {userToken?: string, accessToken: string}) => {
    userToken.value = tokenData.accessToken
    userTokenVerified.value = tokenData.userToken
}

export const setUser = (user: any) => {
    userData.value = user
}
export const setUserBalance = (balance: number) => {
    userData.value.balance = balance
}
export const forceLogOut = () => {
    userToken.value = ''
    useRouter().push("/auth/login/pin");
}
export const logout = () => {
    const modal = useModal(SignOutModal, {
        config: {
            closeable: true,
            background: "main-white",
            width: 363,
            blur: true,
            corner: "20px",
        },
        props: {
            headerText: "Logout of your account?",
            message:
                "Please confirm if you want to sign out of your account. This action will log you out and you will need to sign in again to access your account.",
        },
    });
}

export const getUserData = async () => {
    try {
        const req = useAxios(true).get('/auth/me')
        const data = (await req).data;
        setUser(data.data)
    } catch (error: any) {
        console.log(error.response.data.data.message || error.response.data.message || 'Something went wrong kindly try again')
    }
}

const { openAlert } = useAlert()
export const loadingBalance = ref(false);
// export const fetchUserBalance = async () => {
//     try {
//         loadingBalance.value = true;
//         const req = await useAxios(true).get(`/auth/get/balance`);

//         if (req.status) {
//             setUserBalance(req.data.data.balance)
//             return req.data.data;
//         }

//     } catch (error: any) {
//         openAlert({ type: 'ERROR', msg: error.response.data.data.message || error.response.data.message || 'Something went wrong kindly try again' });
//     } finally {
//         loadingBalance.value = false;
//     }
// }