const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// 导入每次删除文件夹的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//导入抽取css插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: { //配置入口节点
        'bundle': path.resolve(__dirname, './src/main.js'),
    },
    output: {
        path: path.resolve(__dirname, './docs'),
        filename: 'js/[name].js' // 将来再发布的时候，除了会有一个 bundle.js ，还会多一个 vendor~bundle.js 的文件，里面存放了所有的第三方包
    },
    mode: 'production', // 设置mode
    plugins: [ //插件
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),
        new CleanWebpackPlugin({ path: './docs' }), //要删除的文件
        // new webpack.optimize.UglifyJsPlugin({
        //     compress:{warnings:false}
        // }),
        new ExtractTextPlugin("./css/styles.css") //抽取css
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                //第三方库抽离
                vendor: {
                    priority: 1, //权重
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 0, //大于0个字节
                    minChunks: 1, //在分割之前，这个代码块最小应该被引用的次数
                }
            }
        },
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    compress: false,
                    mangle: true,
                    output: {
                        comments: false
                    }
                },
                sourceMap: false
            })
        ]
    },
    module: {
        rules: [ //所有第三方模块的匹配规则
            {
                test: /\.scss$/, use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: '../' // 指定抽取的时候，自动为我们的路径加上 ../ 前缀
                })
            },
            {
                test: /\.css$/, use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath: '../'
                })
            },
            {
                test: /\.less$/, use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "less-loader",
                    publicPath: '../'
                })
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/, use: [
                    {
                        loader: 'file-loader',
                        options: { name: './fonts/[name].[hash:8].[ext]' }
                    }
                ]
            },//会打包到dist下的fonts文件夹下，必须使用hash
            { test: /\.(png|gif|jpg|bmp|ico)$/, use: [
                    {
                        loader:'url-loader',
                        options: {limit: 8192,name:'images/[name].[hash:8].[ext]'}
                    }   //必须使用hash
                ] 
            },
            { test: /\.js?$/, use: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.pdf$/,
                use: {
                  loader: 'file-loader',
                  options: {
                    name: 'pdf/[name].[ext]'
                  }
                }
            }
        ]
    }
}