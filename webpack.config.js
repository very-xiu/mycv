const path = require('path');

const htmlWebpackPlugins=require('html-webpack-plugin');

module.exports={
    entry:path.resolve(__dirname,'./src/main.js'),// 入口，表示，要使用 webpack 打包哪个文件
    output:{// 输出文件相关的配置
        path:path.resolve(__dirname,'/dist'),// 指定 打包好的文件，输出到哪个目录中去
        filename:'bundle.js'    // 这是指定 输出的文件的名称
    },
    plugins:[
        new htmlWebpackPlugins({// 创建一个 在内存中 生成 HTML  页面的插件
            template:path.resolve(__dirname,'./src/index.html'), // 指定 模板页面，将来会根据指定的页面路径，去生成内存中的 页面
            filename:'index.html'// 指定生成的页面的名称
        })
    ],
    module:{// 这个节点，用于配置 所有 第三方模块 加载器 
        rules:[// 所有第三方模块的 匹配规则
            {test:/\.css$/,use:['style-loader','css-loader']},//  配置处理 .css 文件的第三方loader 规则
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},//配置处理 .less 文件的第三方 loader 规则
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},// 配置处理 .scss 文件的 第三方 loader 规则
            {test:/\.(jpg|jpeg|gif|bmp|png|ico)$/,use:'url-loader'},
            {test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader 
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/}, //配置babel来转换高级的ES语法
        ]
    }
}