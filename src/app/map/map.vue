<template lang="pug">
#map
</template>


<script>
export default {
    name: 'map',
    components: {},
    mounted: function() {
        
        console.log(getComputedStyle(document.getElementById('map')).width)
        let navigationControl = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_LEFT,
            type: BMAP_NAVIGATION_CONTROL_LARGE
        });
        let map = window.map = new BMap.Map("map", {
            enableMapClick: false
        });    // 创建Map实例
        map.centerAndZoom(new BMap.Point(107.078445, 34.86314), 5);  // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放s
        map.addControl(navigationControl);
        map.setMapStyle({
            style: 'midnight'
        });
    }
}
</script>

<style lang="scss">
#map {
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 60px;
    right: 0px;
    bottom: 0;
    background: #021019;
    canvas {
        max-width: inherit;
    }
}
</style>


