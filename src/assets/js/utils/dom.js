/**
 * 判断元素是否含有某个class
 * @param el  元素
 * @param className class值
 * @returns {Boolean}
 */
export function hasClass(el, className) {
  let reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
  return reg.test(el.className);
}
/**
 * 给元素添加class
 * @param  el 元素
 * @param className className
 * @returns {*} 
 */
export function addClass(el, className) {
  if (hasClass(el, className)) return;
  let newClass = el.className.split(" ");
  newClass.push(className);
  el.className = newClass.join("");
}
/**
 * 给元素删除class
 * @param  el 元素
 * @param className className
 * @returns {*} 
 */
export function removeClass(el, className) {
  if (hasClass(el, className)) {
    el.className = el.className.replace(
      new RegExp("(\\s|^)" + className + "(\\s|$)"),
      " "
    );
  }
}
/**
 * 判断元素是否在body中
 * @param  el 元素
 * @returns {Boolean} 
 */
export function isInDocument(el) {
  return document.body.contains(el);
}
/**
 * 根据属性，获取元素的样式值
 * @param el  元素
 * @param attr 属性
 * @param pseudoClass 元素伪类
 * @returns {*}
 */
export function getStyle(el, attr, pseudoClass = null) {
  return window.getComputedStyle(el, pseudoClass)[attr];
}
/**
 * 获取属性，并且属性值是数字，而不是字符串
 * @param el 元素
 * @param attr 属性
 * @param pseudoClass 元素伪类
 * @returns {Number}
 */
export function getStyleNumber(el, attr, pseudoClass = null) {
  try {
    const val = getStyle(el, attr, pseudoClass);
    return parseFloat(val);
  } catch (e) {
    console.error(e);
  }
}