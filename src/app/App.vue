<template lang="pug">
#app
    NavComp
    MapComp
    Layers
</template>

<script>
import Nav from './navs/nav.vue';
import MapComp from './map/map.vue';
import Layers from './layers/layers.vue';

export default {
  name: 'app',
  components: {
    NavComp: Nav,
    MapComp: MapComp,
    Layers
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