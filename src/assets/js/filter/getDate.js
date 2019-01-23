import Vue from "vue";
Vue.filter("getDate", timestamp => {
  typeof timestamp === "string" && (timestamp = timestamp.replace(/-/g, "/"));
  let oDate = new Date(timestamp),
    cDate = new Date(),
    interval = cDate - oDate,
    hour,
    minute,
    hourStr,
    minuteStr,
    result;
  //一小时内
  if (interval < 3600000) {
    if (~~(interval / 60000) == 0) {
      result = "刚刚";
    } else {
      result = (~~(interval / 60000)).toString() + "分钟前";
    }
  } //今年之内
  else {
    hour = oDate.getHours();
    minute = oDate.getMinutes();
    hourStr = hour < 10 ? "0" + hour.toString() : hour.toString();
    minuteStr = minute < 10 ? "0" + minute.toString() : minute.toString();
    if (cDate.getFullYear() === oDate.getFullYear()) {
      //今日之内
      if (cDate.getDate() === oDate.getDate()) {
        result = "今天" + hourStr + ":" + minuteStr;
      }
      //今日以前
      else
        result =
          (oDate.getMonth() + 1).toString() +
          "月" +
          oDate.getDate().toString() +
          "日 " +
          hourStr +
          ":" +
          minuteStr;
    }
    //今年以前
    else
      result =
        oDate.getFullYear().toString() +
        "年 " +
        (oDate.getMonth() + 1).toString() +
        "月" +
        oDate.getDate().toString() +
        "日 " +
        hourStr +
        ":" +
        minuteStr;
  }
  return result;
});
