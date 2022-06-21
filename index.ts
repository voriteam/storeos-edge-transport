import { fastify } from "fastify";
const server = fastify({});

const port = 8080;

const start = async () => {
  try {
    await server.listen({
      port: 8080,
    });
    console.log("Server started on port 8080");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
