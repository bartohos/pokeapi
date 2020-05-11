import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Pokemon from "./components/Pokemon";
import AddPokemon from "./components/AddPokemon";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/pokemon/:id" component={Pokemon} />
                    <Route exact path="/add" component={AddPokemon} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
