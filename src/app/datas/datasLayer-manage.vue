<template lang="pug">
.datam-layers

</template>
 
<script>
import { Action, Store } from "marine";
import datas from "./defaultDatas.js";

datas.forEach(item => (item.visiable = true));
export default {
  data: function() {
    return {
      datas
    };
  },
  computed: {},
  methods: {},
  mounted: function() {}
};
</script>

<style lang="scss">
.datam-layers {
  display: none;
  position: absolute;
  border-left: 1px solid #323232;
  left: 310px;
  right: 0;
  top: 0;
  bottom: 0;
  background: #404040;
}
</style>
