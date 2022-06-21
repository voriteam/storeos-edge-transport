"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const server = (0, fastify_1.fastify)({});
const port = 8080;
const start = async () => {
    try {
        await server.listen({
            port: 8080,
        });
        console.log("Server started on port 8080");
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=index.js.map