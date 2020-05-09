import mongoose from "mongoose";
import { PokemonType, IPokemonModel } from "./pokemon";

const PokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      message: "The name is already taken.",
      validator: async (name: string) => {
        return await CheckNameUnique(name);
      }
    }
  },
  notes: String,
  type: {
    type: [String],
    validate: {
      message: "One of the types is not correct.",
      validator: (type: [string]): boolean => {
        for (const t in type) {
          if (
            !Object.values(PokemonType).includes(
              type[t].toString().toLowerCase()
            )
          ) {
            return false;
          }
        }
        return true;
      }
    }
  }
});

export const Pokemon = mongoose.model<IPokemonModel>("Pokemon", PokemonSchema);

async function CheckNameUnique(name: string) {
  const pok = await Pokemon.findOne({ name }, "name");
  if (pok) {
    return false;
  }
  return true;
}
