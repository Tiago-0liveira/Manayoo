import React, { Component } from 'react';
import Main from "./Main";
import Password from "./Password"
import Config from "./../Config"

type AppManagerProps = {}
type AppManagerState = { loggedIn: boolean }


class AppManager extends Component<AppManagerProps, AppManagerState> {
    constructor(props: AppManagerProps) {
        super(props)
        this.state = {
            loggedIn: false,
        };
    }

    render() {
        return (
            <Config>
                {this.state.loggedIn ? <Main /> : <Password loginHandler={(bool: boolean) => bool && this.setState({ loggedIn: true }) && console.log(bool)} />}
            </Config>
        );
    }
}

export default AppManager;











