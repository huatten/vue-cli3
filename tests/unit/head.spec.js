import { shallowMount } from "@vue/test-utils";
import Header from "components/header/index.vue";

describe("Header", () => {
  const wrapper = shallowMount(Header, {
    propsData: {
      hasBack: false,
      titleTxt: "标题"
    }
  });
  it("head组件", () => {
    console.log(wrapper);
  });
});
