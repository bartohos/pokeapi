import mongoose from "mongoose";

const PokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: async (name: String) => {
        return await CheckNameUnique(name);
      },
      message: 'The name is already taken.'
    }
  },
  type: {
    type: [String],
    validate: {
      validator: (type: [string]): boolean => {
        for (const t in type) {
          if (!Object.values(PokemonType).includes(type[t].toString().toLowerCase())) {
            return false;
          }
        };

        return true;
      },
      message: 'One of the types is not correct.'
    }
  },
  notes: String
});

export const Pokemon = mongoose.model<IPokemonModel>("Pokemon", PokemonSchema);

async function CheckNameUnique(name: String) {
  const pok = await Pokemon.findOne({ name: name }, 'name');
  if (pok) {
    return false;
  }

  return true;
}

export interface IPokemonModel extends mongoose.Document {
  name: String,
  type: PokemonType,
  notes: String
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
};