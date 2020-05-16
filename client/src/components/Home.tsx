import React, { Component } from "react";
import Helper from "../helpers/Helper";
import { IPokemon } from "../models/IPokemon";
import "../styles/Home.css";
import { Input, Button, Pagination } from 'semantic-ui-react'

const WAIT_INTERVAL = 400;
interface IHomeState {
    pokemons: IPokemon[];
    pokemonsFiltred: IPokemon[];
    currentPage: number;
    searchValue: string;
    PageSize: number;
}

class Home extends Component<{}, IHomeState> {
    public timer: any;
    constructor(props: {}) {
        super(props);
        this.state = {
            currentPage: 1,
            pokemons: [],
            pokemonsFiltred: [],
            searchValue: "",
            PageSize: 9
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.triggerChange = this.triggerChange.bind(this);
    }

    public handleClick(currentPage: string | number | undefined) {
        this.setState({
            currentPage: Number(currentPage)
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
        const { pokemonsFiltred, PageSize } = this.state;
        const renderPoke = this.renderItems(pokemonsFiltred);

        return (
            <div className="ui search">
                <Input
                    type="text"
                    className="input"
                    placeholder="Search..."
                    onChange={this.handleChange}
                />
                <ul>{renderPoke}</ul>
                <ul>
                    <Pagination
                        boundaryRange={0}
                        defaultActivePage={1}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={1}
                        prevItem={null}
                        nextItem={null}
                        totalPages={Math.ceil(pokemonsFiltred.length / PageSize)}
                        onPageChange={(event, data) => this.handleClick(data.activePage)} />
                </ul>
                <ul>
                    <Button primary href="/add">Add</Button>
                </ul>
            </div>
        );
    }

    private renderItems(pokemonsFiltred: IPokemon[]) {
        const { currentPage, PageSize } = this.state;
        const currentPokes = pokemonsFiltred.slice((currentPage - 1) * PageSize, (currentPage) * PageSize);
        const renderPoke = currentPokes.map((pokemon: IPokemon, index: number) => (
            <div className="column" key={index}>
                <a href={`/pokemon/${pokemon._id}`}>
                    <div className="ui card">
                        <div className="image">
                            <img src={require("../Assets/image.png")} alt="" />
                        </div>
                        <div className="content">
                            <div className="header">{pokemon.name}</div>
                            <div className="meta">
                                <span className="date">{pokemon.type}</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div >
        ));

        return (<div className="ui three column grid">
            {renderPoke}
        </div>)
    }
}

export default Home;
