module.exports = {
  // other webpack config options...
  devServer: {
    setupMiddlewares: function (middlewares, devServer) {
      // Custom middleware before other middlewares
      middlewares.unshift((req, res, next) => {
        // your custom middleware code here
        next();
      });

      // Custom middleware after other middlewares
      middlewares.push((req, res, next) => {
        // your custom middleware code here
        next();
      });

      return middlewares;
    },
  },
};
