<template lang="pug">
div
  .layers(v-if="nav==='data'")
      .layers-fn
          .layers-title 数据管理
          .layers-new 
              md-button.md-raised.layers-new-btn 拖拽文件到浏览器以上传数据
      ul.layers-lists(v-if="datas.length > 0")
          li(v-for="(item, index) in datas" :class="item.active?'active':''" @click='changeActive(index)')
              span {{item.name}}
              svg.tarsh(viewBox="0 0 24 24")
                  path(d="M21 5h-4v-1c0-1.656-1.344-3-3-3h-4c-1.656 0-3 1.344-3 3v1h-4c-0.55 0-1 0.45-1 1s0.45 1 1 1h1v13c0 1.656 1.344 3 3 3h10c1.656 0 3-1.344 3-3v-13h1c0.55 0 1-0.45 1-1s-0.45-1-1-1zM9 4c0-0.55 0.45-1 1-1h4c0.55 0 1 0.45 1 1v1h-6v-1zM18 20c0 0.55-0.45 1-1 1h-10c-0.55 0-1-0.45-1-1v-13h12v13z")
                  path(d="M10 10c-0.55 0-1 0.45-1 1v6c0 0.55 0.45 1 1 1s1-0.45 1-1v-6c0-0.55-0.45-1-1-1z")
                  path(d="M14 10c-0.55 0-1 0.45-1 1v6c0 0.55 0.45 1 1 1s1-0.45 1-1v-6c0-0.55-0.45-1-1-1z")
  Manage
</template>
 
<script>
import { Action, Store } from "marine";
import datas from "./defaultDatas.js";
import Manage from "./datasLayer-manage.vue";
datas.forEach(item => (item.visiable = true));
export default {
    data: function () {
        return {
            datas,
            nav: null
        };
    },
    components: {
        Manage
    },
    computed: {},
    methods: {},
    mounted: function () {
        Store.on("home.changeNav", StoreData => {
            // console.log(StoreData)
            this.nav = StoreData.data;
        });
    }
};


</script>

<style lang="scss">
.data-layer {
  position: absolute;
  border-left: 1px solid #323232;
  left: 60px;
  width: 250px;
  top: 0;
  bottom: 0;
  background: #323232;
}
</style>
