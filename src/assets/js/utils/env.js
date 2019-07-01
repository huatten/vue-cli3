import Vue from 'vue'

export const inBrowser = !Vue.prototype.$isServer || typeof window !== 'undefined'
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isWeibo = UA && /Weibo/gi.test(UA)
export const isWeixin = UA && /micromessenger/i.test(UA)
export const isQQ = UA && /QQ/i.test(UA)
export const isAndroid = UA && UA.indexOf('android') > 0
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)