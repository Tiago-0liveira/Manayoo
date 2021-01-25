import React, { Component } from 'react';
import apps from "./apps/apps"
import "./styles/SideBarstyle.scss"
import SideBarBaseComponent from "./sidebarBaseComponent"


type SideBarProps = {}
type SideBarState = {}

export default class SideBar extends Component<SideBarProps, SideBarState> {
    constructor(props: SideBarProps) {
        super(props)
        this.state = {
            ...props,
        }
    }
    render() {
        return (
            <div className="sidebar">
                {apps.map(app =>
                    <div className="app">
                        <SideBarBaseComponent name={app.name} app={app.app} icon={app.icon} />
                    </div>
                )}
            </div>
        );
    }
}