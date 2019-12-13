import React, { Component } from "react";
import Helper from "../helpers/Helper";
import { IPokemon } from "../models/IPokemon";
import './Home.css';
import PokemonList from "./PokemonList";

const WAIT_INTERVAL = 400;

export interface IPokemonStateState {
  pokemons: IPokemon[];
  pokemonsFiltred: IPokemon[];
  currentPage: number;
  pokemonPerPage: number;
  value: string;
}

class Home extends Component<{}, IPokemonStateState> {
  timer: any;
  constructor(props: {}) {
    super(props);
    this.state = {
      pokemons: [],
      pokemonsFiltred: [],
      currentPage: 1,
      pokemonPerPage: 10,
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.triggerChange = this.triggerChange.bind(this);
  }

  handleClick(event: any) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  async componentDidMount() {
    this.timer = null;
    const pokemons = await Helper.fetch('/search');
    this.setState({ pokemons, pokemonsFiltred: pokemons });
  }

  handleChange(event: any) {
    clearTimeout(this.timer);
    this.setState({ value: event.target.value });

    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  }

  async triggerChange() {
    const { value } = this.state;
    const searchedPokemons = await Helper.fetch('/search/' + value);
    this.setState({
      pokemonsFiltred: searchedPokemons
    });
  }

  render() {
    const { pokemonsFiltred, currentPage, pokemonPerPage } = this.state;
    const { renderPoke, renderPageNumbers } = this.renderItems(currentPage, pokemonPerPage, pokemonsFiltred);

    return (
      <div>
          <h2>List of Pokemons</h2>
          <input type="text" className="input" placeholder="Search..." onChange={this.handleChange}></input>
          <ul>
            {renderPoke}
          </ul>
          <ul id="page-numbers">
            {renderPageNumbers}
          </ul>
      </div>
    );
  }

  private renderItems(currentPage: number, pokemonPerPage: number, pokemonsFiltred: IPokemon[]) {
    const indexOfLastPoke = currentPage * pokemonPerPage;
    const indexOfFirstPoke = indexOfLastPoke - pokemonPerPage;
    const currentPokes = pokemonsFiltred.slice(indexOfFirstPoke, indexOfLastPoke);
    const renderPoke = currentPokes.map((pokemon: IPokemon, index: number) => (<div key={index}>
      <PokemonList pokemon={pokemon}></PokemonList>
    </div>));
    const pageNumbers: number[] = [];
    for (let i = 1; i <= Math.ceil(pokemonsFiltred.length / pokemonPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (<li key={number} id={number.toString()} onClick={this.handleClick}>
        {number} <span> </span>
      </li>);
    });
    return { renderPoke, renderPageNumbers };
  }
}

export default Home