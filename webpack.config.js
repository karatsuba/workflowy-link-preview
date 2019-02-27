const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader');

const PATHS = {
    DIST: path.resolve(__dirname, './dist'),
    SRC_BACKGROUND: path.resolve(__dirname, './src/background'),
    SRC_CONTENT: path.resolve(__dirname, './src/content'),
    RESOURCES: path.resolve(__dirname, './resources'),
    MANIFEST: path.resolve(__dirname, './resources/manifest.json')
};

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
        background: path.resolve(PATHS.SRC_BACKGROUND),
        content: path.resolve(PATHS.SRC_CONTENT)
    },
    output: {
        filename: '[name].js',
        path: PATHS.DIST
    },
    plugins: [
        new ChromeExtensionReloader(),
        new CopyPlugin([{ from: PATHS.MANIFEST, to: PATHS.DIST }])
    ]
});

module.exports = config;
