const Mock = require("mockjs");
const Random = Mock.Random;
//奖品信息
Mock.mock("/api/prizeinfo", "get", {
  code: 0,
  data: [
    {
      "class": "cash",
      "level": 1,
      "picUrlDesc": "http://sinacloud.net/jellystatic/h5resource/lottery/cash58.png",
      "commodityName": "@cname"
    },
    {
      "class": "goldbar",
      "level": 2,
      "picUrlDesc": "http://sinacloud.net/jellystatic/h5resource/lottery/goldbar.png",
      "commodityName": "@cname"
    },
    {
      "class": "cash",
      "level": 3,
      "picUrlDesc": "http://sinacloud.net/jellystatic/h5resource/lottery/cash88.png",
      "commodityName": "@cname"
    },
    {
      "class": "cash",
      "level": 8,
      "picUrlDesc": "http://sinacloud.net/jellystatic/h5resource/lottery/cash3.png",
      "commodityName": "@cname"
    },
    {},
    {
      "class": "cash",
      "level": 4,
      "picUrlDesc": "http://sinacloud.net/jellystatic/h5resource/lottery/cash18.png",
      "commodityName": "@cname"
    },
    {
      "class": "cash",
      "level": 7,
      "picUrlDesc": "http://sinacloud.net/jellystatic/h5resource/lottery/cash888.png",
      "commodityName": "@cname"
    },
    {
      "class": "goldbar",
      "level": 6,
      "picUrlDesc": "http://sinacloud.net/jellystatic/h5resource/lottery/goldbar.png",
      "commodityName": "@cname"
    },
    {
      "class": "cash",
      "level": 5,
      "picUrlDesc": "http://sinacloud.net/jellystatic/h5resource/lottery/cash5.png",
      "commodityName": "@cname"
    }
  ],
  msg: "success"
});
//中奖信息
Mock.mock("/api/wininfo", "get", {
  code: 0,
  data: {
    "position|1-8": 2,
    prizeName: "@cname"
  },
  msg: "success"
})
//中奖滚动信息
Mock.mock("/api/scrollinfo", "get", {
  code: 0,
  data: {
    "scrollinfo|1-5": [{
      "name": "@cname",
      'phone': /^1[385][1-9]\d{8}/,
      "time": "@time('HH:mm:ss')",
    }]
  },
  msg: "success"
})