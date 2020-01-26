const glob = require("glob")
const  path = require('path')
const  ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = [{
    entry: glob.sync("./assets/js/script.js"),
    output: {
      path: __dirname + '/static/js',
      filename: 'script.js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query:
        {
          presets: ['es2015', 'stage-0']
        }
      }]
    }
  },
  {
    entry: {
      style: glob.sync("./assets/sass/style.scss"),
    },
    output: {
      path: path.join(__dirname, 'static/css'),
      filename: '[name].css'
    },
    module: {
      rules: [{
          test: /\.(scss|sass)$/i,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
                loader: 'css-loader',
                options: {
                  url: false,
                  minimize: true,
                  sourceMap: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: (loader) => [
                    require('autoprefixer')()
                  ],
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  outputStyle: 'compressed',
                  sourceMap: true
                }
              }
            ]
          })
        }
      ]
    },
    devtool: 'source-map',
    plugins: [
      new ExtractTextPlugin('[name].css'),
    ]
  }
]
