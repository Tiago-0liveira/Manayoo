import PassManager, { PasswordManagerIcon } from "./passmanager"

interface App {
    name: string,
    app: any,
    icon: any
}

const Apps: App[] = [
    { name: "PassManager", app: PassManager, icon: PasswordManagerIcon }
]

export default Apps