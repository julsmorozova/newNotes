const path = require('path')

module.exports = {
  resolve: {
    modules: ['node_modules', path.resolve('./app')],
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: path.join(__dirname, './compiled'),
    port: 9000
  },
  entry: path.resolve(__dirname, './app/entry.jsx'),
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './compiled'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'app')
        ],
        loader: 'babel-loader',
        options: {presets: ['es2015', 'stage-0', 'react']}
      },
      {test: /\.(jpg|png|woff|woff2|ttf|eot|svg|ico)$/, loader: 'url-loader?limit=10000'},
      {test: /\.json$/,loader: 'json-loader'},
      {test: /\.css$/, loaders: ['style-loader','css-loader','postcss-loader']},
      {test: /\.scss$/, loaders: [
        'style-loader',
        'css-loader?sourceMap&modules=true&localIdentName=[name]_[local]_[hash:base64:6]',
        'postcss-loader',
        'sass-loader?sourceMap'
      ]}
    ]
  }
}
