import { Component } from "react";
import React from "react";
import { IPokemon, PokemonType } from "../models/IPokemon";
import Helper from "../helpers/Helper";
import _ from "underscore";
import Button from "@material-ui/core/Button";
import {
    FormControl,
    InputLabel,
    NativeSelect,
    Input
} from "@material-ui/core";

interface IAddPokemonState extends IPokemon {
    response: boolean | undefined;
    showError: boolean;
    errorMessages: string[];
}

class AddPokemon extends Component<{}, IAddPokemonState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            name: "",
            _id: "",
            notes: "",
            type: [PokemonType.Grass],
            response: undefined,
            showError: false,
            errorMessages: []
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNotesChange = this.handleNotesChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.AddNewPokemon = this.AddNewPokemon.bind(this);
    }

    public handleNameChange(event: any) {
        this.setState({ name: event.target.value });
    }

    public handleNotesChange(event: any) {
        this.setState({ notes: event.target.value });
    }

    public handleTypeChange(event: any) {
        this.setState({ type: event.target.value });
    }

    public async AddNewPokemon() {
        const body = _.pick(this.state, ["name", "type", "notes"]);
        try {
            const response = await Helper.post("/pokemon", body);
            this.setState({ response });
        } catch (error) {
            this.setState({
                showError: true,
                errorMessages: error.message
                    .split(":")
                    .slice(2)
                    .join(":")
                    .split(",")
            });
        }
    }

    private showError = () => {
        const { showError, errorMessages } = this.state;
        const errors = showError ? (
            <>
                {errorMessages.map(err => {
                    return <ul>{err}</ul>;
                })}
            </>
        ) : (
                <></>
            );
        return errors;
    };

    public render() {
        return (
            <>
                <ul>
                    <Input
                        type="text"
                        className="input"
                        placeholder="Name"
                        onChange={this.handleNameChange}
                    />
                </ul>
                <ul>
                    <FormControl>
                        <InputLabel htmlFor="age-native-helper">Type</InputLabel>
                        <NativeSelect
                            onChange={this.handleTypeChange}
                            value={this.state.type}
                        >
                            {getPokemonTypeList()}
                        </NativeSelect>
                    </FormControl>
                </ul>
                <ul>
                    <Input
                        type="text"
                        className="input"
                        placeholder="Notes"
                        onChange={this.handleNotesChange}
                    />
                </ul>
                <ul>
                    <Button
                        onClick={this.AddNewPokemon}
                        variant="contained"
                        color="primary"
                        href="/"
                    >
                        Add
          </Button>
                </ul>
                <ul>{this.showError()}</ul>
            </>
        );
    }
}

const getPokemonTypeList = () => {
    const enumValues: string[] = [];
    // tslint:disable-next-line: forin
    for (const value in PokemonType) {
        enumValues.push(value);
    }

    return enumValues.map(item => {
        return <option key={item}>{item}</option>;
    });
};

export default AddPokemon;
