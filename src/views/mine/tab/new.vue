<template>
  <div>
    最新入库
  </div>
</template>
<script type="text/ecmascript-6">
import axios from "axios";
export default {
  name: "new",
  data() {
    return {};
  },
  mounted() {
    this.once();
  },
  methods: {
    once() {
      axios
        .get("https://jelly.sina.com/h5/index/indexSyncData?_=1550115423571")
        .then(res => {
          alert(res + "最新入库:首次进入只请求一次");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
