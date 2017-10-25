<template lang="pug">

</template>

<script>
import { Action, Store } from "marine";
import datas from "./defaultDatas.js";

export default {
  data: function() {
    return {
      datas: []
    };
  },
  props: ['nav'],
  computed: {},
  methods: {
    changeNav: function(data) {
      this.nav = data;
      Action.home.emit("changeNav", data);
    }
  },
  mounted: function() {
    Store.on("home.getDatas", () => {
      Action.home.emit("receiveDatas", datas);
    });
  }
};
</script>

<style lang="scss">

</style>
