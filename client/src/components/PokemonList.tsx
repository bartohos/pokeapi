import React, { Component } from "react";
import { Link } from "react-router-dom";
import { IPokemon } from "../models/IPokemon";

class PokemonList extends Component<{ pokemon: IPokemon }> {
    render() {
        const { pokemon } = this.props
        return (
            <li key={pokemon._id}>
                <Link to={`/pokemon/${pokemon._id}`}>{pokemon.name}</Link>
            </li>
        )
    }

}

export default PokemonList