import { Button, Frog } from "@airstack/frog";
import { devtools } from "@airstack/frog/dev";
import { serveStatic } from "@hono/node-server/serve-static";
import { handle } from "@airstack/frog/vercel";

export const app = new Frog({
    apiKey: process.env.AIRSTACK_API_KEY as string,
    assetsPath: "/", // Указание директории для статических файлов
    basePath: "/api", // Указание базового пути для API
});

// Обработчик для основного маршрута
app.frame('/', (c) => {
    const { buttonValue } = c;
    const imageSrc = buttonValue === "smile" ? `${app.assetsPath}img2.jpg` : `${app.assetsPath}img1.jpg`;

    return c.res({
        image: imageSrc, // Передаем URL изображения
        intents: [
            <Button value="smile">Click to make Sharky smile</Button> // Кнопка для смены изображения
        ]
    });
});

devtools(app, { serveStatic });
export const GET = handle(app);
export const POST = handle(app);
