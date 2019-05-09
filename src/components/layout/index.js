import Vue from "vue";
//validateFileName
const validateFileName = str => {
  return /^\S+\.vue$/.test(str) &&
    str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) => ($1))
}
// Register global components
const requireComponent = require.context("./", true, /\w+\.(vue)$/);
requireComponent.keys().forEach(component => {
  if (validateFileName(component) !== 'index') return
  const componentConfig = requireComponent(component);
  const ctrl = componentConfig.default || componentConfig;
  ctrl && Vue.component(ctrl.name, ctrl);
  console.log(ctrl);
});
