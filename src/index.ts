import { Hono } from "hono";

const app = new Hono();

app.get("/", async (context) => {
	const html = await Bun.file("./src/index.html").text();
	return context.html(html);
});

export default app;
