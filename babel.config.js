module.exports = {
  presets: [
    [
      "@vue/app",
      {
        polyfills: ["es6.promise", "es6.symbol", "es7.promise.finally"]
      }
    ]
  ]
};
