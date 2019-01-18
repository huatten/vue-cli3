<template>
  <div class="m-marquee" >
    <ul class="m-marquee-cont" :class="{'m-marquee-top': animate}">
      <li v-for="(item, index) in scrollList" :key="index">
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
