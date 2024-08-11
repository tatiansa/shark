import { Button, Frog } from "@airstack/frog";
import { devtools } from "@airstack/frog/dev";
import { serveStatic } from "@hono/node-server/serve-static";
import { handle } from "@airstack/frog/vercel";
import { config } from "dotenv";

config();

export const app = new Frog({
    apiKey: process.env.AIRSTACK_API_KEY as string,
    assetsPath: "/",
    basePath: "/api",
});

// Frame to display initial image and button
app.frame('/', (c) => {
    return c.res({
        action: '/smile',
        image: (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <img
                    src="/images/img1.jpg"
                    alt="Initial Image"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </div>
        ),
        intents: [
            <Button value="smile">Click to make Sharky smile</Button>
        ]
    });
});

// Frame to handle smile button click and display the second image
app.frame('/smile', (c) => {
    const { buttonValue } = c;
    const imageSrc = buttonValue === "smile" ? "/images/img2.jpg" : "/images/img1.jpg";

    return c.res({
        image: (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <img
                    src={imageSrc}
                    alt="Response Image"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </div>
        )
    });
});

devtools(app, { serveStatic });
export const GET = handle(app);
export const POST = handle(app);