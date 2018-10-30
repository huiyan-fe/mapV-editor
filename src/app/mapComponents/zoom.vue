<template lang="pug">
.zoom
    .zoom-in(@click="zoomIn" title="放大一级")
        .zoom-smcbg
    .zoom-out(@click="zoomOut" title="缩小一级")
        .zoom-smcbg
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
        width: 26px;
        height: 26px;
        background-color: #fff;
        box-shadow: 1px 2px 1px rgba(0,0,0,.15);
        .zoom-smcbg {
            position: relative;
            top: 8px;
            left: 8px;
            width: 10px;
            height: 10px;
            background-image: url('./mapZoom.png');
        }
    }
    .zoom-in {
        border-bottom: 1px solid #ccc;
        border-radius: 2px 2px 0 0;
        .zoom-smcbg {
            background-position: 0 0;
        }
        &:hover .zoom-smcbg {
            background-position: -20px 0;
        }
    }
    .zoom-out {
        border-radius: 0 0 2px 2px;
        .zoom-smcbg {
            background-position: -10px 0;
        }
        &:hover .zoom-smcbg {
            background-position: -30px 0;
        }
    }
}
</style>
