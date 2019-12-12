import React, { Component } from "react";
import { IPokemon } from "../models/IPokemon";
import Pokemon from "./Pokemon";

export interface State {
  pokemons: any
}

class Home extends Component {
  state: State = {
    pokemons: []
  }

  getResponse = async () => {
    const response = await fetch('/pokemons');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  async componentDidMount() {
    try {
      const pokemons = await this.getResponse();
      this.setState({ pokemons });
    } catch (error) {
      this.setState({ renderedResponse: error.message });
    }
  }

  render() {
    const { pokemons } = this.state;

    return (
      <div>
        <h2>List of Pokemons</h2>
        {pokemons.map((pokemon: IPokemon, index: number) => (
          <div key={index}>
            <Pokemon pokemon={pokemon}></Pokemon>
          </div>
        ))}
      </div>
    );
  }
}

export default Home