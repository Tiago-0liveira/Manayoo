import { AppMain, AppPassword, Lang, Theme } from "./types"

const defaultAppPassword: AppPassword = {
    Password: "Password",
    Submit: "Submit",
    Welcome: "Welcome",
    New: "New",
    CreatePass: "Create Password"
}

const defaultAppMain: AppMain = {}

const defaultTheme: Theme = {
    applications: {
        Password: { darkerColor: "#00000059" },
        Main: {}
    },
    global: {
        loadingColor: "#3A84EE",
        mainColor: "#601dcc",
        backgroundColor: "#212529",
        fontColor: "#ffffff"
    }
}

const defaultLang: Lang = {
    applications: {
        Password: defaultAppPassword,
        Main: {}
    },
    errors: {
        Wrong: "Wrong Password!",
        Length: "Password too short!"
    }
}


export { defaultAppMain, defaultAppPassword, defaultLang, defaultTheme }