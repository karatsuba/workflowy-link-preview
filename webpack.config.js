const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

const DIST = path.resolve(__dirname, './dist');
const RESOURCES = path.resolve(__dirname, './resources');
const SRC_BACKGROUND = path.resolve(__dirname, './src/background');
const SRC_CONTENT = path.resolve(__dirname, './src/content');
const MANIFEST = path.resolve(RESOURCES, './manifest.json');

const getBaseConfig = (options = {}) => ({
    mode: 'development',
    devtool: 'cheap-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
});

const config = Object.assign({}, getBaseConfig(), {
    entry: {
        background: SRC_BACKGROUND,
        content: SRC_CONTENT
    },
    output: {
        filename: '[name].js',
        path: DIST
    },
    plugins: [new ChromeExtensionReloader(), new CopyPlugin([{ from: MANIFEST, to: DIST }])]
});

module.exports = config;
