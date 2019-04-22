// Register global plugin
import Vue from "vue";
const requirePlugin = require.context("./", true, /\w+\.(js)$/); //require.context(directory, useSubdirectories = false, regExp = /^\.\//);
requirePlugin.keys().forEach(plugin => {
  const pluginConfig = requirePlugin(plugin);
  const ctrl = pluginConfig.default;
  ctrl && Vue.use(ctrl);
});
