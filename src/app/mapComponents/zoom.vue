<template lang="pug">
.zoom
    .zoom-in(@click="zoomIn" title="放大一级")
    .zoom-out(@click="zoomOut" title="缩小一级")
</template>

<script>
export default {
    data: function () {
        return {
        };
    },
    methods: {
        zoomIn: function () {
            map.zoomIn();
        },
        zoomOut: function () {
            map.zoomOut();
        },
    },
    mounted() {
    }
}
</script>

<style lang="scss">
.zoom {
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 4000;
    .zoom-in,
    .zoom-out {
        cursor: pointer;
        width: 30px;
        height: 30px;
        background-color: #fff;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 28px;
        box-shadow: 1px 2px 1px rgba(0,0,0,.15);
    }
    .zoom-in {
        background-image: url('zoomin.png');
        border-bottom: 1px solid #ccc;
        border-radius: 2px 2px 0 0;
    }
    .zoom-out {
        background-image: url('zoomout.png');
        border-radius: 0 0 2px 2px;
    }
}
</style>
