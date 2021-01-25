import React, { Component } from 'react';
import "./styles/styles.scss"

type SideBarBaseComponentProps = {
    name: string,
    app: JSX.Element,
    icon: JSX.Element
}
type SideBarBaseComponentState = {}

export default class SideBarBaseComponent extends Component<SideBarBaseComponentProps, SideBarBaseComponentState> {
    constructor(props: SideBarBaseComponentProps) {
        super(props)
        this.state = {
            ...props,
        }

    }
    render() {
        return (
            <div>
                <this.props.icon/>
            </div>
        );
    }
}