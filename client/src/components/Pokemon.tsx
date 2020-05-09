import React, { Component } from "react";
import { Link } from "react-router-dom";
import Helper from "../helpers/Helper";
import { IPokemon } from "../models/IPokemon";

interface IPokemonProps {
  match: {
    params: {
      id: string;
    };
  };
}

interface IPokemonState {
  currentPokemon?: IPokemon;
}

class Pokemon extends Component<IPokemonProps, IPokemonState> {
  constructor(props: IPokemonProps) {
    super(props);
    this.state = {
      currentPokemon: undefined
    };
  }

  public async componentDidMount() {
    const pokemon = await Helper.fetch(
      "/pokemon/" + this.props.match.params.id
    );
    this.setState({ currentPokemon: pokemon });
  }

  public async componentDidUpdate(nextProps: IPokemonProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.match.params.id !== this.state.currentPokemon?._id) {
      const pokemon = await Helper.fetch(
        "/pokemon/" + nextProps.match.params.id
      );
      this.setState({ currentPokemon: pokemon });
    }
  }

  public render() {
    const pokemon = this.state.currentPokemon;
    return (
      <>
        <li>Name: {pokemon?.name} </li>
        <li>Type: {pokemon?.type.join(", ")} </li>
        <li>Notes: {pokemon?.notes} </li>
        <Link to="/">Back</Link>
      </>
    );
  }
}

export default Pokemon;
