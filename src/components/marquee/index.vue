<template>
  <div class="m-marquee" >
    <ul class="m-marquee-cont" :class="{'m-marquee-top': animate}">
      <li v-for="(item, index) in msgList" :key="index">
        <span>{{item.phone}}</span>
        <span>{{item.name}}</span>
        <span>{{item.type}}</span>
        <span>{{item.time}}</span>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "m-marquee",
  data() {
    return {
      animate: false,
      msgList: [
        {
          phone: "178****9005",
          name: "小藤藤",
          type: "50元现金红包",
          time: "1分钟前"
        },
        {
          phone: "138****8556",
          name: "miss鬼鬼",
          type: "100元现金红包",
          time: "2分钟前"
        },
        {
          phone: "135****5200",
          name: "萧敬腾",
          type: "10g金条",
          time: "3分钟前"
        },
        {
          phone: "188****9888",
          name: "马化腾",
          type: "1000元现金红包",
          time: "4分钟前"
        },
        {
          phone: "139****9655",
          name: "小藤藤",
          type: "100g金条",
          time: "5分钟前"
        }
      ]
    };
  },
  mounted() {
    this.msgList.length > 2 && setInterval(this.scroll, 2100);
  },
  methods: {
    scroll() {
      this.animate = true;
      setTimeout(() => {
        this.msgList.push(this.msgList[0]);
        this.msgList.shift();
        this.animate = false;
      }, 500);
    }
  }
};
</script>
<style lang="scss" scoped>
.m-marquee {
  width: 750px;
  height: 70px;
  overflow: hidden;
  position: relative;
  border: 1px solid #666;
  margin: 30px auto;
}
.m-marquee-cont {
  position: absolute;
  top: 0;
  left: 0;
  li {
    line-height: 70px;
    text-align: center;
  }
  span {
    font-size: 28px;
    margin: 0 20px;
  }
}
.m-marquee-top {
  transition: all 0.6s;
  margin-top: -70px;
}
</style>
