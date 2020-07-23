import React, { Component } from "react";
import Helper from "../helpers/Helper";
import { IPokemon } from "../models/IPokemon";
import { Input, Button, Pagination } from 'semantic-ui-react'

const WAIT_INTERVAL = 400;
interface IHomeState {
    pokemons: IPokemon[];
    pokemonsFiltred: IPokemon[];
    currentPage: number;
    searchValue: string;
    PageSize: number;
    showDeletedAll: string
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
            PageSize: 9,
            showDeletedAll: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.triggerChange = this.triggerChange.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
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

    public async deleteAll() {
        const response = await Helper.delete("/pokemons/");
        if (response.message.includes("The pokemons were successfully deleted.")) {
            this.setState({
                pokemonsFiltred: []
            });
        }
        this.setState({
            showDeletedAll: response.message
        });
    }

    public render() {
        const { pokemonsFiltred, PageSize, showDeletedAll } = this.state;
        const renderPoke = this.renderItems(pokemonsFiltred);
        const deleteAllMessage = showDeletedAll ? (
            <div className="ui message">
                <p>{showDeletedAll}</p>
            </div>) : <></>;

        const renderGrid = pokemonsFiltred.length !== 0 ? (
            <>
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
            </>
        ) : <></>;
        return (
            <>
                <div className="ui borderless menu">
                    <div className="item">
                    </div>
                    <div className="right item">
                        <div className="ui icon input">
                            <Input
                                type="text"
                                className="input"
                                placeholder="Search..."
                                onChange={this.handleChange}
                            />
                            <i className="search icon"></i>
                        </div>
                    </div>
                </div>
                {renderGrid}
                <ul>
                    <Button primary href="/add">Add</Button>
                    <Button className="ui negative button icon" onClick={this.deleteAll}>
                        <i className="trash alternate outline icon"></i>
                    </Button>
                    {deleteAllMessage}
                </ul>
            </>
        );
    }

    private renderItems(pokemonsFiltred: IPokemon[]) {
        const { currentPage, PageSize } = this.state;
        const currentPokes = pokemonsFiltred.slice((currentPage - 1) * PageSize, (currentPage) * PageSize);
        const renderPoke = currentPokes.map((pokemon: IPokemon, index: number) => (
            <div className="column" key={index} >
                <div className="ui card">
                    <div className="image">
                        <img src={pokemon.image} alt="" />
                    </div>
                    <div className="content">
                        <div className="header">{pokemon.name}</div>
                        <div className="meta">
                            <span className="date">{pokemon.type}</span>
                        </div>
                    </div>
                </div>
            </div>
        ));

        return (<div className="ui three column grid">
            {renderPoke}
        </div>)
    }
}

export default Home;
