import { type Component, ref } from 'vue';

export interface ModalConfig {
    width?: number,
    background?: string,
    padding?: string,
    closeable?: boolean,
    blur?: boolean,
    corner?: string,
    type?: "modal" | "panel" | "side",
    title?: string
}
export interface modalOptionsType extends ModalConfig {
    open: boolean,
    anim: boolean
}
export const modalOpen = ref(false)
export const compRef = ref<Component[]>([])
export const modalTitle = ref("")
export const modalOptions = ref<modalOptionsType[]>([])
export const modalProps = ref<any>()

export const useModal = (comp: Component, options?: {
    title?: string,
    config: ModalConfig,
    props?: {
        [key: string] : any
    }
}) => {
    modalOpen.value = true
    if (compRef.value.length > 0) {
        compRef.value.push(comp)
    } else {
        compRef.value = [comp]
    }
    modalTitle.value = options?.title || ""
    modalOptions.value.push({
        ...options?.config,
        open: true,
        anim: true
    } || {
        width: 450,
        background: "main-white",
        padding: "20px",
        closeable: true,
        blur: true,
        corner: "52px",
        type: "modal",
        open: true,
        anim: true
    })
    modalProps.value = options?.props
}
export const closeModal = (data: any) => {
    // set a delay for animation to work 
            // modalOpen.value = false
            modalOptions.value[modalOptions.value.length - 1].anim = false

    
    setTimeout(() => {
        const lastModal = modalOptions.value[modalOptions.value.length - 1]
        if(!lastModal) {
         modalOptions.value = []
         compRef.value = []
        }else {
         lastModal.open = false
         compRef.value.pop()
         modalOptions.value.pop()
        }
    }, 300)
    return data
}

export const closeAllModal = (data?: any) => {
    setTimeout(() => {
        modalOpen.value = false
        compRef.value = []
        modalTitle.value = ""
        modalOptions.value = []
        return data
    }, 300)
}