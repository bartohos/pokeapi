export interface IPokemon {
    name: string;
    type: PokemonType[];
    notes: string;
    _id: string;
}

export enum PokemonType {
    Grass = "Grass",
    Poison = "Poison",
    Fire = "Fire",
    Flying = "Flying",
    Water = "Water",
    Bug = "Bug",
    Normal = "Normal",
    Electric = "Electric",
    Ground = "Ground",
    Fairy = "Fairy",
    Fighting = "Fighting",
    Psychic = "Psychic",
    Rock = "Rock",
    Ice = "Ice",
    Ghost = "Ghost",
    Dragon = "Dragon",
    Steel = "Steel"
}
