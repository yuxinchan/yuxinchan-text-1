const path = require('path')
module.exports = {
  css: {
      loaderOptions: {
          sass: {
              includePaths: [path.join(__dirname, 'styles')]
              // includePaths: ['c:/wamp64/www/web/ajax/demo/vue/text4/gulu-demo/src']
          }
      }
  }
}
