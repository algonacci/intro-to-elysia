import { Elysia } from "elysia"

const helloController = (app: Elysia) => {
    app.get("/", () => ({
        status: {
            code: 200,
            message: "Success fetching the API!",
        },
        data: null,
    }))

    return app
}

export default helloController