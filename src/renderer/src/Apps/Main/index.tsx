import React, { Component } from 'react';
import "./styles/style.scss"
import { ConfigContext } from "./../../Config"
import SideBar from "./components/sidebar"

type MainProps = {}
type MainState = {}

export default class Main extends Component<MainProps, MainState> {
    static contextType = ConfigContext
    constructor(props: MainProps) {
        super(props)
        this.state = {
            ...props,
        }
    }
    render() {
        let context = this.context
        return (
            <div>
                <SideBar />
            </div>
        );
    }
}