#!/usr/bin/env node
const https = require("https");
const fs = require("fs");
const handler = require("serve-handler");
const busboy = require("busboy");

const options = {
    key: fs.readFileSync("keys/key.pem"),
    cert: fs.readFileSync("keys/cert.pem"),
};

https
    .createServer(options, (request, response) => {
        if (request.method !== "GET") {
            const bb = busboy({ headers: request.headers });
            bb.on("file", (name, file, info) => {
                console.log(`Uploaded ${info.filename}`);
                file.on("data", () => {});
            });
            bb.on("close", () => {
                response.writeHead(303, { Connection: "close", Location: "/" });
                response.end();
            });
            request.pipe(bb);
        } else {
            // You pass two more arguments for config and middleware
            // More details here: https://github.com/vercel/serve-handler#options
            return handler(request, response, {
                public: "build",
            });
        }
    })
    .listen(8000);

console.log("listening on https://localhost:8000");
