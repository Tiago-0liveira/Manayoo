import React, { Component } from 'react';
import "./styles/styles.scss"
import PasswordManagerIcon from "./../../../../img-svg/apps/PasswordManager"
type PassManagerProps = {}
type PassManagerState = {}

export default class PassManager extends Component<PassManagerProps, PassManagerState> {
    constructor(props: PassManagerProps) {
        super(props)
        this.state = {
            ...props,
        }
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

export { PasswordManagerIcon }