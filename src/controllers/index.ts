import Elysia from "elysia";
import helloController from "./hello";

const controllers = new Elysia()
    .use(helloController)

export default controllers