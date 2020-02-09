const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:path.resolve(__dirname,'./src/main.js'),
    output:{
        path:path.resolve(__dirname,'/docs'),
        filename:'bundle.js'
    },
    plugins:[ //插件
        new htmlWebpackPlugin({
            template:path.resolve(__dirname,'./src/index.html'),
            filename:'index.html'
        })
    ],
    module:{
        rules:[ //所有第三方模块的匹配规则
            {test:/\.css$/, use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},//配置处理 .less 文件的第三方 loader 规则
            {test:/\.scss$/, use:['style-loader','css-loader','sass-loader']},
            {test:/\.(png|gif|jpg|bmp|ico)$/, use:'url-loader?limit=5000'},
            {test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader 
            {test:/\.js$/, use:'babel-loader', exclude:/node_modules/}
        ]
    }
}