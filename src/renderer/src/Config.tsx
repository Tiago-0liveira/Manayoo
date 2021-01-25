import React from "react"
import { Config, appName } from "./types"
import { defaultLang, defaultTheme } from "./typeDefaults"

type ConfigProps = {}
type ConfigState = Config

const conf: Config = {
    Config: {
        language: navigator.language,
        theme: "dark"
    },
    Lang: {
        enEN: defaultLang,
        ptPT: {
            applications: {
                Password: {
                    Password: "Palavra-Passe",
                    Submit: "Verificar",
                    Welcome: "Bem vindo",
                    New: "Nova",
                    CreatePass: "Criar Password"
                },
                Main: {}
            },
            errors: {
                Wrong: "Password errada!",
                Length: "Password pequena!"
            }
        }
    },
    Themes: {
        dark: defaultTheme,
        light: {
            applications: {
                Password: { darkerColor: "#f8c291" },
                Main: {}
            },
            global: {
                backgroundColor: "#ffffff",
                loadingColor: "#3A84EE",
                mainColor: "#fad390",
                fontColor: "#000000"
            }
        }
    },
    updateState: (newState: Config) => { },
    getLang: (appName: appName) => { return defaultLang },
    getTheme: () => { return defaultTheme }
}
export const ConfigContext = React.createContext(conf);
export default class ConfigComponent extends React.Component<ConfigProps, ConfigState> {

    constructor(props: ConfigProps) {
        super(props)
        this.updateState = this.updateState.bind(this)
        conf.updateState = this.updateState;
        conf.getLang = this.getLang;
        conf.getTheme = this.getTheme;
        this.state = conf
    }

    updateState = (newState: Config) => {
        this.setState(newState)
    }

    getLang = (appName: appName) => {
        let lang: string = "enEN"
        if (this.state.Lang[this.state.Config.language.replace("-", "")] !== undefined) { lang = this.state.Config.language.replace("-", "") }
        return this.state.Lang[this.state.Config.language.replace("-", "")]/* this.state.Lang["enEN"]  */
    }

    getTheme = () => { return this.state.Themes[this.state.Config.theme] }


    render() {
        return (
            <ConfigContext.Provider value={this.state}>
                <div style={{ backgroundColor: this.getTheme().global.backgroundColor, position:"absolute", width:"100%", height:"100%" }}>
                    {this.props.children}
                </div>
            </ConfigContext.Provider >
        );
    }
}


