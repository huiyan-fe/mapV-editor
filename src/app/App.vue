<template lang="pug">
#app
    NavComp
    MapComp
    MapV
    DatasetManager
    DatasCore
    DatasLayer(v-show="nav==='data'")
    Layers(v-show="nav==='layer'")
    MapLayers(v-show="nav==='map'")
    Export
</template>

<script>
import Nav from "./navs/nav.vue";
import MapComp from "./map/map.vue";
import Layers from "./layers/layers.vue";
import MapV from "./mapv/mapv.vue";
import DatasCore from "./datas/datasCore.vue";
import DatasLayer from "./datas/datasLayer.vue";
import DatasetManager from './datas/dataset-manager.vue';
import MapLayers from "./map/mapLayer.vue";
import Export from "./export/export.vue";
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
        DatasetManager,
        DatasCore,
        DatasLayer,
        MapLayers,
        Export
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
</style>