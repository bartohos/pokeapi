import { Application } from "express";
import { PokeService } from "./services/pokemonService";

export class Controller {
    private pokeService: PokeService;

    constructor(private app: Application) {
        this.pokeService = new PokeService();
        this.routes();
    }

    public routes() {
        this.app
            .route("/pokemons")
            .get(this.pokeService.getAllPokemon)
            .delete(this.pokeService.deleteAll);

        this.app.route("/pokemon").post(this.pokeService.addNewPokemon);

        this.app
            .route("/pokemon/:id")
            .delete(this.pokeService.deletePokemon)
            .put(this.pokeService.updatePokemon)
            .get(this.pokeService.getPokemonById);

        this.app.route("/search").get(this.pokeService.getAllPokemon);
    }
}
