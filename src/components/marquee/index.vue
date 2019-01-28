<template>
  <div class="m-marquee" >
    <ul class="m-marquee-cont" :class="{'m-marquee-top': animate}">
      <li v-for="(item, index) in scrollList" :key="index">
        <span>{{item.mobile}}</span>
        <span>{{item.nickName}}</span>
        <span>{{item.prizeName}}</span>
        <span>{{item.createTime}}</span>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "m-marquee",
  data() {
    return {
      animate: false
    };
  },
  props: {
    scrollList: {
      type: Array
    }
  },
  mounted() {
    setInterval(this.scroll, 2100);
  },
  methods: {
    scroll() {
      this.animate = true;
      setTimeout(() => {
        this.scrollList.push(this.scrollList[0]);
        this.scrollList.shift();
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
  margin: 30px auto;
  border-radius: 30px;
}
.m-marquee-cont {
  position: absolute;
  top: 0;
  left: 0;
  background: #eeb75c;
  li {
    line-height: 70px;
    text-align: center;
    display: inline-flex;
  }
  span {
    flex: 1;
    text-align: center;
    font-size: 28px;
    width: 190px;
    color: #fff;
  }
}
.m-marquee-top {
  transition: all 0.6s;
  margin-top: -70px;
}
</style>
