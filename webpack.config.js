var autoprefixer = require('autoprefixer')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
//css和js分离
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    //source-map
    devtool: 'eval-source-map',
    entry: __dirname + '/app/main.js', 
    output: {
        path: __dirname + '/build',
        filename: '[name]-[hash].js'   //要配合HtmlWebpackPlugin插件使用
    },

    //本地服务 基于Nodejs npm install --save-dev webpack-dev-server
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
            },
            //image //限制大小小于10k的转成base64 读取的是css内的background的图片
            {   
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=1000'
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
        /**
         * HtmlWebpackPlugin
            这个插件的作用是依据一个简单的模板，帮你生成最终的Html5文件，
            这个文件中自动引用了你打包后的JS文件。每次编译都在文件名中插入一个不同的哈希值。  
            npm install --save-dev html-webpack-plugin
            
            
            这个插件自动完成了我们之前手动做的一些事情，在正式使用之前需要对一直以来的项目结构做一些改变：
            1.移除public文件夹，利用此插件，HTML5文件会自动生成，此外CSS已经通过前面的操作打包到JS中了，public文件夹里。
            2.在app目录下，创建一个Html文件模板，这个模板包含title等其它你需要的元素，
              在编译过程中，本插件会依据此模板生成最终的html页面，会自动添加所依赖的 css, js，favicon等文件，
              在本例中我们命名模板文件名称为index.tmpl.html，模板源代码如下
            3.更新webpack的配置文件，方法同上,新建一个build文件夹用来存放最终的输出文件
         */
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'  //传入模板的位置
        }),
        //给组件分配id
        new webpack.optimize.OccurenceOrderPlugin(),
        //压缩js
        new webpack.optimize.UglifyJsPlugin()
        // css和js分离
        // new ExtractTextPlugin("style.css")
    ]
}