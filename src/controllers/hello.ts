import { Elysia, t } from "elysia"
import { nanoid } from "nanoid";


const uploadsDir = './uploads';

const helloController = (app: Elysia) => {
    app.get("/", () => ({
        status: {
            code: 200,
            message: "Success fetching the API!",
        },
        data: null,
    }))

    app.post('/', ({ body }) => {
        console.log(body);

        return {
            status: {
                code: 200,
                message: "Data received successfully!",
            },
            data: body,
        }
    })

    app.post("/upload", async (ctx: any) => {
        if (!Bun.file(uploadsDir).exists) {
            await Bun.mkdir(uploadsDir, { recursive: true });
        }

        if (!ctx.body.file) {
            console.error('File is undefined:', ctx.body);
            return {
                status: {
                    code: 400,
                    message: "No file provided or wrong field name!"
                },
                data: null,
            };
        }

        const files = Array.isArray(ctx.body.file) ? ctx.body.file : [ctx.body.file];

        for (const f of files) {
            const filePath = `${uploadsDir}/${nanoid()}-${f.name}`;
            await Bun.write(filePath, await f.arrayBuffer());
        }

        return {
            status: {
                code: 200,
                message: "File uploaded successfully!"
            },
            data: null,
        };
    });



    return app
}

export default helloController