<template lang="pug">
#app
    NavComp
    MapComp
    Layers(v-if="nav==='layer'")
</template>

<script>
import Nav from './navs/nav.vue';
import MapComp from './map/map.vue';
import Layers from './layers/layers.vue';
import { Action, Store } from 'marine';
Action.def('home', {});

export default {
  name: 'app',
  data: function() {
    return {
      nav: null
    }
  },
  components: {
    NavComp: Nav,
    MapComp: MapComp,
    Layers
  },
  mounted: function() {
    Store.on('home.changeNav', StoreData => {
      this.nav = StoreData.data;
    })
  }
}
</script>

<style lang="scss">
#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}
</style>