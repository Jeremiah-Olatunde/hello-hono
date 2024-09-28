import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { jsxRenderer } from "hono/jsx-renderer";

import { Home } from "./Home";
import { LayoutBase } from "./LayoutBase";
import { Poem } from "./Poem";

const app = new Hono();

app.get("/", async (context) => {
	const html = await Bun.file("./src/index.html").text();
	return context.html(html);
});

app.get("user/post", (context) => {
	const page = context.req.query("page");
	const limit = context.req.query("limit");

	return context.text(`POST(page: ${page} | limit: ${limit})`);
});

app.get("/user/:id{\\d+}", (context) => {
	const id = context.req.param("id");
	return context.text(`USER(${id})`);
});

app.get("/poem", (context) => {
	return context.html(<Poem />);
});

app.get("/static/*", serveStatic({ root: "./src" }));

app.get("/page/*", jsxRenderer(LayoutBase));
app.get("/page/home", (context) => context.render(<Home />));

export default app;
