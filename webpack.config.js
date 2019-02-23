const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

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

const background = Object.assign({}, getBaseConfig(), {
    entry: {
        index: path.resolve(PATHS.SRC_BACKGROUND)
    },
    output: {
        filename: 'background.js',
        path: PATHS.DIST
    },
    plugins: [new CopyPlugin([{ from: PATHS.MANIFEST, to: PATHS.DIST }])]
});

const content = Object.assign({}, getBaseConfig(), {
    entry: {
        index: path.resolve(PATHS.SRC_CONTENT)
    },
    output: {
        filename: 'content.js',
        path: PATHS.DIST
    }
});

module.exports = [background, content];
