const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, './docs'),
        filename: 'bundle.js'
    },
    plugins: [ //插件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            inject: true,
            favicon: './src/favicon.ico'
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ],
    module: {
        rules: [ //所有第三方模块的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, //配置处理 .less 文件的第三方 loader 规则
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader 
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.(jpg|jpeg|gif|bmp|png|ico)$/,
                loader: 'url-loader',
                options: {//图片大小小于8kb，就会被base64处理，优点：减少请求数量（减轻服务器压力），缺点：图片体积更大（文件请求速度更慢）
                    limit: 8 * 1024,
                    // 因为url-loader默认使用ES6模块化解析，而html-loader引入图片是commonjs，解析时会出现问题：[object Module]
                    // 解决方法：关闭url-loader的ES6模块化，使用commonjs解析
                    esModule: false,
                    // 给图片进行重命名
                    name: '[hash:10].[ext]'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'  //处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
            }
        ]
    }
}