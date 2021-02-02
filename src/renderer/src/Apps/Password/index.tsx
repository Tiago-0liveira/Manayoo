import React, { Component } from 'react';
import { ConfigContext } from "../../Config"
import { PasswordProps, PasswordState } from './types';
import LoadingSvg from "./../img-svg/loadingSvg";
import "./styles/style.scss"
import axios from "axios"
const appIcon = require("../../../../../public/app-icon.png")
import { decode, encode } from "./../../helpers/encryption"
const appName = "Password"

let password: string
export default class Password extends Component<PasswordProps, PasswordState> {
    static contextType = ConfigContext
    constructor(props: PasswordProps) {
        super(props)
        /* this.props.loginHandler(true) REMOVE ON PROD */
        this.state = {
            ...props,
            password: "",
            loading: true,
            err: ""
        }
    }
    keydownHandler = (e: KeyboardEvent) => e.keyCode === 13 && this.props.loginHandler(password === this.state.password)
    componentDidMount = () => {
        document.addEventListener("keydown", this.keydownHandler)
        axios.get("http://localhost:2000/getAppConfig").then(res => {
            let data = decode(res.data);
            delete data.password
            this.setState({
                AppConfig: data,
                loading: false
            })
        }).catch(err => { console.error(err)})
    }
    componentWillUnmount = () => document.removeEventListener("keydown", this.keydownHandler)
    validatePass = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, getLang: any) => {
        const isAuth = password === this.state.password
        this.props.loginHandler(isAuth)
        if (!isAuth) {
            e.preventDefault()
            this.setState({ err: getLang(appName).errors.Wrong, password: "" })
        }
    }
    createPass = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, getLang: any) => {
        if (this.state.password.length >= 8) {
            const data = encode({
                ...this.state.AppConfig,
                password: this.state.password,
                firstTime: false
            })
            axios.post("http://localhost:2000/updateAppConfig",
                data).then(res => {
                    res.data.status && this.props.loginHandler(true)
                }).catch(err => err && console.error(err))
        } else {
            this.setState({ err: getLang(appName).errors.Length })
        }
        this.state.password !== "" ? this.setState({ password: "" }) : e.preventDefault()
    }

    render() {
        let context = this.context
        let component: JSX.Element
        if (this.state.loading) {
            component = <LoadingSvg />
        } else {
            component =
                <div className="login-div" style={{ background: "#152b41cc" }}>
                    <div className="login-box" style={{ color: context.getTheme().global.fontColor }}>
                        <h1 style={{ borderBottom: `6px solid ${context.getTheme().global.mainColor}` }}>{context.getLang(appName).applications[appName][this.state.AppConfig?.firstTime ? "Welcome" : "Password"]}</h1>
                        {this.state.err !==  "" && <h3 className="h3-err" style={{ color: "#f12121", borderLeft: "2px solid #f1212198" }}>{this.state.err}</h3>}
                        <div className="textbox" style={{ borderBottom: `4px solid ${context.getTheme().global.mainColor}` }}>
                            <i className="fas fa-lock"></i>
                            <input style={{ color: context.getTheme().global.fontColor }} onChange={(e) => {
                                this.setState({ password: e.target.value })
                            }} value={this.state.password} type="password" placeholder={this.state.AppConfig?.firstTime ? context.getLang(appName).applications[appName].New + " " + context.getLang(appName).applications[appName].Password : context.getLang(appName).applications[appName].Password} />
                        </div>
                        <input style={{
                            border: `2px solid ${context.getTheme().global.mainColor}`, color: context.getTheme().global.fontColor
                        }} type="button" className="btn" value={context.getLang(appName).applications[appName][this.state.AppConfig?.firstTime ? "CreatePass" : "Submit"]}
                            onClick={e => { (this.state.AppConfig?.firstTime ? this.createPass : this.validatePass)(e, context.getLang) }} />
                    </div>
                    <img className="app-icon" src={appIcon.default} />
                </div >
        }
        return (
            <div className="bg" style={{ background: `linear-gradient(90deg,${context.getTheme().global.mainColor} 0%,${context.getTheme().applications.Password.darkerColor} 100%)` }}>
                {component}
            </div>
        );
    }
}


