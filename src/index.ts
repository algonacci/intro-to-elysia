import { logger } from '@grotto/logysia';
import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { staticPlugin } from '@elysiajs/static'
import controllers from "./controllers";


const app = new Elysia()
  .use(logger({
    logIP: false,
    writer: {
      write(msg: string) {
        console.log(msg)
      }
    }
  }))
  .use(swagger())
  .use(staticPlugin())
  .use(controllers)
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
