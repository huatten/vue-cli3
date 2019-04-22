import Vue from "vue";
// Register global components
const requireComponent = require.context("./", true, /\w+\.(vue)$/);
requireComponent.keys().forEach(component => {
  const componentConfig = requireComponent(component);
  const ctrl = componentConfig.default || componentConfig;
  ctrl && Vue.component(ctrl.name, ctrl);
  console.log(ctrl);
});
