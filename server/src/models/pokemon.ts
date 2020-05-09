import mongoose from "mongoose";

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
