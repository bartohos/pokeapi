import React, { Component } from "react";
import Helper from "../helpers/Helper";
import { IPokemon } from "../models/IPokemon";
import { Button } from "semantic-ui-react";
import { Redirect } from "react-router";

interface IPokemonProps {
    match: {
        params: {
            id: string;
        };
    };
}

interface IPokemonState {
    currentPokemon?: IPokemon;
    response: any
}

class Pokemon extends Component<IPokemonProps, IPokemonState> {
    constructor(props: IPokemonProps) {
        super(props);
        this.state = {
            currentPokemon: undefined,
            response: null
        };

        this.deletePokemon = this.deletePokemon.bind(this);
    }

    public async componentDidMount() {
        const pokemon = await Helper.fetch("/pokemon/" + this.props.match.params.id);
        this.setState({ currentPokemon: pokemon });
    }

    public async componentDidUpdate(nextProps: IPokemonProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.match.params.id !== this.state.currentPokemon?._id) {
            const pokemon = await Helper.fetch("/pokemon/" + nextProps.match.params.id);
            this.setState({ currentPokemon: pokemon });
        }
    }

    public async deletePokemon() {
        const _id = this.state.currentPokemon?._id;
        const response = await Helper.delete(`/pokemon/${_id}`);
        this.setState({
            response
        });
    }

    public render() {
        const { response, currentPokemon: pokemon } = this.state;
        const notes = pokemon?.notes ? <li>Notes: {pokemon?.notes} </li> : <></>
        if (response) {
            return <Redirect to={"/"}></Redirect>
        }
        return (
            <>
                <li>Name: {pokemon?.name} </li>
                <li>Type: {pokemon?.type.join(", ")} </li>
                <li><div className="image">
                    <img src={pokemon?.image} alt="" />
                </div></li>
                {notes}
                <Button
                    primary
                    variant="contained"
                    href="/">
                    Back
                    </Button>
                <Button
                    color="red"
                    variant="contained"
                    onClick={this.deletePokemon}>
                    Delete
                    </Button>
            </>
        );
    }
}

export default Pokemon;
