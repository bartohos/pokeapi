import React, { Component } from "react";
import { Link } from "react-router-dom";
import Helper from "../helpers/Helper";
import { IPokemon } from "../models/IPokemon";
import "../styles/Home.css";
import { Input, Button } from "@material-ui/core";

const WAIT_INTERVAL = 400;
export interface IHomeState {
  pokemons: IPokemon[];
  pokemonsFiltred: IPokemon[];
  currentPage: number;
  pokemonPerPage: number;
  searchValue: string;
}

class Home extends Component<{}, IHomeState> {
  public timer: any;
  constructor(props: {}) {
    super(props);
    this.state = {
      currentPage: 1,
      pokemonPerPage: 10,
      pokemons: [],
      pokemonsFiltred: [],
      searchValue: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.triggerChange = this.triggerChange.bind(this);
  }

  public handleClick(event: any) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  public async componentDidMount() {
    this.timer = null;
    const pokemons = await Helper.fetch("/search");
    this.setState({ pokemons, pokemonsFiltred: pokemons });
  }

  public handleChange(event: any) {
    clearTimeout(this.timer);
    this.setState({ searchValue: event.target.value });

    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  }

  public async triggerChange() {
    const { searchValue: value } = this.state;
    const searchedPokemons = await Helper.fetch("/search/" + value);
    this.setState({
      pokemonsFiltred: searchedPokemons
    });
  }

  public render() {
    const { pokemonsFiltred, currentPage, pokemonPerPage } = this.state;
    const { renderPoke, renderPageNumbers } = this.renderItems(
      currentPage,
      pokemonPerPage,
      pokemonsFiltred
    );

    return (
      <div>
        <h2>List of Pokemons</h2>
        <Input
          type="text"
          className="input"
          placeholder="Search..."
          onChange={this.handleChange}
        />

        <ul>{renderPoke}</ul>
        <ul id="page-numbers">{renderPageNumbers}</ul>

        <Button variant="contained" color="primary" href="/add">
          Add
        </Button>
      </div>
    );
  }

  private renderItems(
    currentPage: number,
    pokemonPerPage: number,
    pokemonsFiltred: IPokemon[]
  ) {
    const indexOfLastPoke = currentPage * pokemonPerPage;
    const indexOfFirstPoke = indexOfLastPoke - pokemonPerPage;
    const currentPokes = pokemonsFiltred.slice(
      indexOfFirstPoke,
      indexOfLastPoke
    );
    const renderPoke = currentPokes.map((pokemon: IPokemon, index: number) => (
      <div key={index}>
        <li key={pokemon._id}>
          <Link to={`/pokemon/${pokemon._id}`}>{pokemon.name}</Link>
        </li>
      </div>
    ));
    const pageNumbers: number[] = [];
    for (
      let i = 1;
      i <= Math.ceil(pokemonsFiltred.length / pokemonPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(pageNumber => {
      return (
        <li
          key={pageNumber}
          id={pageNumber.toString()}
          onClick={this.handleClick}
        >
          {pageNumber} <span> </span>
        </li>
      );
    });
    return { renderPoke, renderPageNumbers };
  }
}

export default Home;
