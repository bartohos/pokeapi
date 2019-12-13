export interface IPokemon {
    name: string,
    type: PokemonType[],
    notes: string,
    _id:string
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
