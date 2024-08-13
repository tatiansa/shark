import { Button, Frog } from "@airstack/frog";
import { devtools } from "@airstack/frog/dev";
import { serveStatic } from "@hono/node-server/serve-static";
import { handle } from "@airstack/frog/vercel";

export const app = new Frog({
    apiKey: process.env.AIRSTACK_API_KEY as string,
    assetsPath: "/", // Specify the directory for static files
    basePath: "/api", // Specify the base path for the API
});

// Single handler to toggle between images
app.frame('/', (c) => {
    const { buttonValue } = c;
    let imageSrc;
    let button = null;

    // Determine which image to show based on the current button value
    if (buttonValue === "smile") {
        imageSrc = `${app.assetsPath}img2.jpg`; // Show the second image
        // No button under the second image
    } else {
        imageSrc = `${app.assetsPath}img1.jpg`; // Show the first image
        button = <Button value="smile">Click to make Sharky smile :)</Button>; // Button to switch to img2
    }

    return c.res({
        image: imageSrc, // Return the appropriate image
        intents: button ? [button] : [] // Render the button only if it's defined
    });
});

devtools(app, { serveStatic });
export const GET = handle(app);
export const POST = handle(app);
