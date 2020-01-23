import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Pokemon from "./components/Pokemon";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/pokemon/:id" component={Pokemon} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
