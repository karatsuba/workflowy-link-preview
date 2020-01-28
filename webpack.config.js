const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { version } = require('./package.json');

const DIST = path.resolve(__dirname, './dist');
const RESOURCES = path.resolve(__dirname, './resources');
const SRC_BACKGROUND = path.resolve(__dirname, './src/background');
const SRC_CONTENT = path.resolve(__dirname, './src/content');
const MANIFEST = path.resolve(RESOURCES, './manifest.json');

const getBaseConfig = production => ({
    mode: production ? 'production' : 'development',
    devtool: production ? false : 'inline-cheap-source-map',
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

module.exports = ({ production = false, reloader = false, analyze = false } = {}) => {
    const config = {
        ...getBaseConfig(production),
        entry: {
            background: SRC_BACKGROUND,
            content: SRC_CONTENT
        },
        output: {
            filename: '[name].js',
            path: DIST
        },
        plugins: [
            new CopyPlugin([
                {
                    from: MANIFEST,
                    to: DIST,
                    transform: content => {
                        const manifest = JSON.parse(content.toString());
                        manifest.version = version;
                        return JSON.stringify(manifest, undefined, 4);
                    }
                }
            ])
        ]
    };

    if (reloader) {
        config.plugins.push(new ChromeExtensionReloader());
    }

    if (analyze) {
        config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
};
