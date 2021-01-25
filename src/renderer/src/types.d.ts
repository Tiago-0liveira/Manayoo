interface AppPassword {
    Password: string,
    Submit: string,
    Welcome: string,
    New: string,
    CreatePass: string
}

interface AppMain { }
interface ThemePassword {

}
interface ThemeMain {

}
interface Theme {
    applications: {
        Password: ThemePassword,
        Main: ThemeMain
    },
    global: {
        loadingColor: string,
        mainColor: string,
        backgroundColor: string,
        fontColor: string
    }
}

interface Lang {
    applications: {
        Password: AppPassword,
        Main: AppMain
    },
    errors: {
        [key: string]: string
    }
}

interface Config {
    Config: {
        language: string,
        theme: string
    },
    Lang: {
        [key: string]: Lang
    },
    Themes: {
        [key: string]: Theme
    },
    updateState: (newState: Config) => void,
    getLang: (appName: appName) => Lang,
    getTheme: () => Theme
}

export { appName, AppPassword, AppMain, Theme, Lang, Config, ThemePassword, ThemeMain }