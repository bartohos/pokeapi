import React from "react";
import Routes from "./route";

function App() {
    return (
        <div className="ui grid">
            <div className="three wide column"></div>
            <div className="App ten wide column">
                <Routes></Routes>
            </div>
            <div className="three wide column"></div>
        </div>
    );
}

export default App;
