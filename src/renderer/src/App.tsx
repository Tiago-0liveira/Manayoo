import React from "react";
import ReactDOM from "react-dom";
import AppManager from "./Apps"
import "./styles/style.scss"

class App extends React.Component<{}, {}> {
    render() {
        return (
            <AppManager />
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"))