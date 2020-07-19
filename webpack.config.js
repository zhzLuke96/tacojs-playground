const {
    resolve
} = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    devtool: devMode ? "inline-source-map" : false,
    entry: {
        "index": './src/index.ts'
    },
    output: {
        // library: "myLibrary",
        // libraryTarget: "umd",
        filename: devMode ? '[name].[hash:8].js' : '[name].min.js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /(node_modules|bower_components)/,
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.ttf$/,
            use: ['file-loader']
        }]
    },
    resolve: {
        extensions: [
            '.ts', ".js", ".jsx", "tsx"
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(),
    ]
};