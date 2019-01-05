// vue.config.js
// https://cli.vuejs.org/config/#css-extract

module.exports = {
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        //data: `@import "@/variables.scss";`
      }
    }
  }
}
