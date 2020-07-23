import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import mongoose from "mongoose";
import { MONGO_URL } from "./constants/pokeApi.constants";
import { Controller } from "./main.controller";

class App {
  public app: Application;
  public pokeController: Controller;

  constructor() {
    this.app = express();
    this.setConfig();
    this.pokeController = new Controller(this.app);
    this.setMongoConfig();
  }

  private setConfig() {
    // Allows us to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: "50mb" }));

    // Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

    // Enables cors
    this.app.use(cors());
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  }
}

export default new App().app;
