import React from "react";
import { Switch, Route } from "react-router";
import Home from "./components/Home";
import Pokemon from "./components/Pokemon";
import AddPokemon from "./components/AddPokemon";
import { BrowserRouter } from "react-router-dom";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/pokemon/:id" component={Pokemon} />
                <Route exact path="/add" component={AddPokemon} />
            </Switch>
        </BrowserRouter>);
}

export default Routes;