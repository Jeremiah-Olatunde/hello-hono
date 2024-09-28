import { Hono } from "hono";

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

export default app;
