import React, { Component } from 'react';
import "./styles/styles.scss"

type SideBarBaseComponentProps = {
    name: string,
    app: JSX.Element,
    Icon: JSX.Element
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
        const Icon = this.props.Icon
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}