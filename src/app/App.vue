<template lang="pug">
#app
    NavComp
    MapComp
    Layers(v-if="nav==='layer'")
    MapV
    DatasCore
    DatasLayer(v-if="nav==='data'")
</template>

<script>
import Nav from "./navs/nav.vue";
import MapComp from "./map/map.vue";
import Layers from "./layers/layers.vue";
import MapV from "./mapv/mapv.vue";
import DatasCore from "./datas/datasCore.vue";
import DatasLayer from "./datas/datasLayer.vue";
import { Action, Store } from "marine";
Action.def("home", {});

export default {
  name: "app",
  data: function () {
    return {
      nav: null
    };
  },
  components: {
    NavComp: Nav,
    MapComp,
    Layers,
    MapV,
    DatasCore,
    DatasLayer
  },
  mounted: function () {
    Store.on("home.changeNav", StoreData => {
      this.nav = this.nav === StoreData.data ? null : StoreData.data;
    });
  }
};
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine
@include md-register-theme("default");
@import "~vue-material/dist/theme/all"; // Apply the theme

#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}

.layers {
  position: absolute;
  border-left: 1px solid #323232;
  left: 60px;
  width: 250px;
  top: 0;
  bottom: 0;
  background: #323232;
  .layers-fn {
    background: #404040;
    padding-bottom: 1px;
  }
  .layers-title {
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    margin: 0 15px;
    color: #b9b9b9;
    border-bottom: 1px solid #717070;
  }
  .md-button.layers-new-btn {
    margin-top: 10px;
    width: 250px - 30px;
    height: 30px;
    line-height: 30px;
    min-height: 30px;
    box-sizing: border-box;
    font-size: 14px;
    margin-left: 15px;
    background-color: #6b6b6b;
    color: #eee; // margin-left: 15px;
  }
}

.layers-lists {
  .layer-name {
    vertical-align: middle;
    display: inline-block;
    max-width: 160px;
    white-space: nowrap;
    // text-overflow: ellipsis;
    overflow: hidden;
    outline: none;
    // &:focus {
    //   text-overflow: clip;
    // }
  }
  cursor: pointer;
  position: absolute;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
  list-style: none;
  padding: 0;
  margin: 0;
  color: #b9b9b9;
  overflow: auto;
  li {
    border-left: 2px solid rgba(0, 0, 0, 0);
    padding-left: 10px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    margin-top: 0px !important;
    &:hover {
      background: #383838;
    }
    &.active {
      border-left: 2px solid white;
      background: #404040;
    }
    svg {
      vertical-align: middle;
      display: inline-block;
      width: 18px;
      height: 18px;
      fill: #b9b9b9;
      margin-right: 10px;
      &.tarsh {
        float: right;
        margin-right: 10px;
        margin-top: 12px;
      }
    }
  }
}

.layers-tips {
  color: #b9b9b9;
  padding: 10px;
  .tipsbox {
    border-top: 1px solid #505050;
    padding: 15px;
    margin-top: 10px;
  }

  .tips {
    margin: 10px 0;
    font-size: 12px;
    svg {
      margin: 0 5px;
    }
  }
}
</style>