import mongoose from "mongoose";
import { PokemonType, IPokemonModel } from "./pokemon";

const PokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Why no name?"],
        validate: {
            message: "The name is already taken.",
            validator: validateName()
        }
    },
    notes: String,
    type: {
        type: [String],
        required: [true, "Why no type?"],
        validate: {
            message: "One of the types is not correct.",
            validator: validateType()
        }
    },
    image: String
});

export const Pokemon = mongoose.model<IPokemonModel>("Pokemon", PokemonSchema);

function validateType() {
    return (type: [string]): boolean => {
        for (const t in type) {
            if (
                !Object.values(PokemonType).includes(type[t].toString().toLowerCase())
            ) {
                return false;
            }
        }
        return true;
    };
}

function validateName() {
    return async (name: string) => {
        const pok = await Pokemon.findOne({ name }, "name");
        if (pok) {
            return false;
        }
        return true;
    };
}
