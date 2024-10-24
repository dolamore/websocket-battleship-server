import path from 'path';
import nodeExternals from 'webpack-node-externals';
import Dotenv from 'dotenv-webpack';
import {fileURLToPath} from "url";
import webpack from 'webpack';

const { DefinePlugin } = webpack;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'development';

const config = {
    mode: isProduction ? 'development' : 'production',
    entry: {
        main: './index.ts',
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            type: 'module',
        },
        chunkFormat: 'module',
    },
    experiments: {
        outputModule: true,
    },
};

export default config;