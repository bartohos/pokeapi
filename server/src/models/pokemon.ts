import mongoose from "mongoose";

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

export interface IPokemonModel extends mongoose.Document {
  name: string;
  type: PokemonType;
  notes: string;
}

export enum PokemonType {
  grass,
  poison,
  fire,
  flying,
  water,
  bug,
  normal,
  electric,
  ground,
  fairy,
  fighting,
  psychic,
  rock,
  ice,
  ghost,
  dragon,
  steel
}
