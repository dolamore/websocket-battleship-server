import path from 'path';
import nodeExternals from 'webpack-node-externals';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'development';

export const config = {
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