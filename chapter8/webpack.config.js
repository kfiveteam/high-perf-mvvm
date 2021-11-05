/**
 * @file
 */
const path = require("path");

module.exports = {
    entry: "./demo/backend.js",
    output: {
        filename: "backend.js",
        path: path.resolve(__dirname, "demo/dist"),
    }
};
