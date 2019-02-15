<template>
  <div>
    最多关注
  </div>
</template>
<script type="text/ecmascript-6">
import axios from "axios";
export default {
  name: "more",
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
          alert(res + "最多关注:首次进入只请求一次");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
