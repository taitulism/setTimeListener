const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, arg) => {
    return {
        mode: 'development',
        entry: './index.js',
        devtool: 'inline-source-map',
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                title: 'Development'
            })
        ],
        devServer: {
            contentBase: './dist'
        },
    };
};