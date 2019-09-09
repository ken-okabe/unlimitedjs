import { server } from "./server.js";

const dir = "./www";
const port = 19999;
const serverUp = () => {
  console.log("server up " + port);
};

server(dir)(port)(serverUp);
