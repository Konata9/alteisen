const merge = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  devtool: "source-map",
  mode: "development",
  devServer: {
    host: "localhost",
    port: 2233,
    hot: true,
    inline: true,
    open: true,
    historyApiFallback: true
  }
});
