import { Button, Frog } from "@airstack/frog";
import { devtools } from "@airstack/frog/dev";
import { serveStatic } from "@hono/node-server/serve-static";
import { handle } from "@airstack/frog/vercel";

export const app = new Frog({
    apiKey: process.env.AIRSTACK_API_KEY as string,
    assetsPath: "/", // Specify the directory for static files
    basePath: "/api", // Specify the base path for the API
});

app.frame("/", (c) => {
    const { buttonValue } = c;
    const showSmile = buttonValue === "smile";

    return c.res({
        image: showSmile
            ? `${app.assetsPath}/img2.jpg`
            : `${app.assetsPath}/img1.jpg`,
        intents: showSmile
            ? []
            : [<Button value="smile">Click to make Sharky smile :)</Button>]
    });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
