import React, { Component } from "react"
import { IPokemon } from "../models/IPokemon"

class Pokemon extends Component<{ pokemon: IPokemon }> {
    render() {
        const { pokemon } = this.props
        return (
            <li>{pokemon.name}</li>
        )
    }
}

export default Pokemon