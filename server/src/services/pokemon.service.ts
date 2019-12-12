import { Request, Response } from "express";
import { Pokemon } from "../models/pokemon";

export class PokeService {
    public async hello(req: Request, res: Response){
        res.json({ express: 'Hello From Express' });
    }
    public async getAllPokemon(req: Request, res: Response) {
        try {
            const pokemons = await Pokemon.find({}, { __v: 0 });
            return res.status(200).json(pokemons);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    public async addNewPokemon(req: Request, res: Response) {
        try {
            const newPokemon = new Pokemon(req.body);
            const pokemon = await newPokemon.save();
            return res.status(200).json(pokemon);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    public async deletePokemon(req: Request, res: Response) {
        try {
            const pokemonID = req.params.id;
            await Pokemon.findByIdAndRemove(pokemonID);
            res.status(200).send("The pokemon was deleted");
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    public async deleteAll(req: Request, res: Response) {
        try {
            await Pokemon.deleteMany({});
            res.status(200).send('The pokemons was successfully deleted.');
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    public async updatePokemon(req: Request, res: Response) {
        try {
            const pokemonId = req.params.id;
            await Pokemon.findByIdAndUpdate(
                pokemonId,
                req.body,
            );

            res.status(200).json("The pokemon was updated.");
        } catch (error) {
            return res.status(400).send(error);
        }
    }
    
    public async getPokemonById(req: Request, res: Response) {
        try {
            const pokemonID = req.params.id;
            const result = await Pokemon.findById(pokemonID);
            if (result) {
                return res.status(200).json(result);
            }

            return res.status(200).send("No pokemon with this ID was found.");
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    public async searchByName(req: Request, res: Response){
        try {
            const regex = new RegExp(escapeRegex(req.params.name), 'gi');
            const result = await Pokemon.find({name:regex}, { __v: 0 });
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }
}

function escapeRegex(name: string): string | RegExp {
    return name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}