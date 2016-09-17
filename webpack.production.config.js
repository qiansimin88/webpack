var autoprefixer = require('autoprefixer')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    //source-map
    devtool: 'eval-source-map',
    entry: __dirname + '/app/main.js', 
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js' 
    },

    //本地服务 基于Nodejs
    devServer: {
        contentBase: './build', //本地服务器加载页面所在目录
        color: true, //终端输出结果为彩色
        historyApiFallback: true, //所以链接指向index.html 不跳转
        inline: true, //浏览器实时刷新
        port: 5656  
    },

    //各种loaders
    /**
     * test : 所要处理的文件的拓展名或者正则表达式（必须）
     * Loader: Loader的名称（必须）
     * include/exclude: 手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
     * query: 为loaders提供额外的设置选项（可选）
     */
    module: {
        loaders : [
            // {
            //     test: /\.json$/,  //以json结尾的所有文件
            //     loader: "json"
            // }

            //es6
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            //vue
            {
                test: /\.vue/,
                loader: 'vue'
            },
            //css
            {
                test: /\.css$/,
                loader: 'style!css!postcss'//style: 内嵌到页面 css:实现css在js文件中的require/import功能
            }
        ]
    },
    //npm install postcss-loader autoprefixer
    postcss: [
       autoprefixer({ browsers: ['last 2 versions'] })  //调用autoprefixer插件
    ],
    //webpack plugins字段  安装各种插件 和loaders不同  Loader本质是处理文件的流
    plugins: [
        //webpack自带的添加声明的插件（在bundle的头添加注释）） 要require webpack依赖
        new webpack.BannerPlugin('Copyright QSM inc@2016'),
       
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'  //传入模板的位置
        })
    ]
}