module.exports = {
  chainWebpack: config => {
    // remove vue-cli-service's progress output
    config.plugins.delete('progress');
  },

  devServer: {
    disableHostCheck: true
  }

  // lintOnSave: false
};
