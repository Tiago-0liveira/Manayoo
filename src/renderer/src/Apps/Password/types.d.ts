interface PasswordProps {
    loginHandler: (bool: boolean) => void
}
interface PasswordState {
    password: string,
    loading: boolean,
    err: string,
    AppConfig?: {
        firstTime: boolean,
        autoLogin: boolean,
        lastLogin: string,
        theme: string,
        lang: string
    }
}


export { PasswordProps, PasswordState }