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
                {apps.map((app, i) =>
                    <div className="app" data-app-name={app.name} key={i}>
                        <SideBarBaseComponent name={app.name} app={app.app} Icon={app.icon} >
                            <app.icon className="app-icon" size="64"/>
                            <p className="app-name">{app.name}</p>
                        </SideBarBaseComponent>
                    </div>
                )}
            </div>
        );
    }
}