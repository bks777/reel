import path            from "path";
import WriteFilePlugin from 'write-file-webpack-plugin';
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    entry: ["./src/js/main"],
    output: {
        path: path.join(__dirname, './build'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                loader: "babel-loader",
                test: /(\.jsx|\.js)$/,
                query: {
                    presets: "es2015"
                }
            }
        ]
    },
    debug: false,
    plugins: [
        new WriteFilePlugin
    ]
};