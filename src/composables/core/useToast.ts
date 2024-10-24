

const ALERT_DURATION = 5000



export const openAlertArray = ref([] as Record<string, any>[])

interface AlertTypes {
	type: 'Alert' | 'ERROR' | 'SUCCESS'
	msg: string
	addrs?: string,
	title?: string,
    light?: boolean
}

export const useAlert = () => {
	const openAlert = ({ type, msg, addrs, title, light }: AlertTypes) => {
		const id = Date.now().toString()
		openAlertArray.value.push({ id, type, msg, addrs, title, light })
	}
	const closeAlert = (id:string) => {
		openAlertArray.value = openAlertArray.value.filter((alert: any) => alert.id !== id)
	}

	return { openAlert, closeAlert, ALERT_DURATION }
}



