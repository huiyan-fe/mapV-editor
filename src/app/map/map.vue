<template lang="pug">
#mapv
</template>

<script>
import Config from './config.js';
export default {
    name: 'mapv',
    components: {
    },
    mounted: function () {
        let navigationControl = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_LEFT,
            type: BMAP_NAVIGATION_CONTROL_LARGE
        });
        let map = window.map = new BMap.Map("mapv", {
            enableMapClick: false
        });    // 创建Map实例
        map.centerAndZoom(new BMap.Point(Config.center[0], Config.center[1]), Config.zoom);  // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl({
            mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP]
        }));   //添加地图类型控件
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        map.addControl(navigationControl);
        map.setMapStyle({
            style: localStorage.getItem('e-mapstyle') || 'visualization' || 'midnight'
        });
    }
}
</script>

<style lang="scss">
#mapv {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 220px;
  right: 0px;
  bottom: 0;
  background: #021019;
  canvas {
    max-width: inherit;
  }
}
</style>


