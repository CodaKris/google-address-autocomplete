const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  },
  output: {
    filename: 'google-address-autocomplete.min.js',
    library : 'gaAutocomplete',
    libraryTarget : 'umd'

  },
    plugins: [
   new webpack.optimize.UglifyJsPlugin({

     // Eliminate comments
        comments: false,

    // Compression specific options
       compress: {
         // remove warnings
            warnings: false,

         // Drop console statements
            drop_console: true
       },
    })
  ]
}
