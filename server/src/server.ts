import app from "./app";
import { PORT } from "./constants/pokeApi.constants";

// tslint:disable-next-line: no-console
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
