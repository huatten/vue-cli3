export function hasClass(el, className) {
  let reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
  return reg.test(el.className);
}

export function addClass(el, className) {
  if (hasClass(el, className)) return;
  let newClass = el.className.split(" ");
  newClass.push(className);
  el.className = newClass.join("");
}

export function removeClass(el, className) {
  if (hasClass(el, className)) {
    el.className = el.className.replace(
      new RegExp("(\\s|^)" + className + "(\\s|$)"),
      " "
    );
  }
}
