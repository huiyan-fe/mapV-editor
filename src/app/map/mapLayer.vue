<template lang="pug">
.map-layers
    .layers-fn
        .layers-title 底图管理
        .layers-close(@click="closeLayer")
            svg(viewBox="0 0 1024 1024")
                path(d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z")
        //- .layers-new 
            md-button.md-raised.layers-new-btn 请选择底图样式
    .layers-choose
        .layers-block(v-for="(item, index) in styles")
            div(@click="changeStyle(index)" :class="index===activeStyle?'layers-mapblock-name active':'layers-mapblock-name'" :title="item.desc") 
                img(:src="`./static/images/map/${index}.png`")
                p {{item.title}}

</template>


<script>
import { Action, Store } from "marine";
export default {
    data: function () {
        return {
            activeStyle: localStorage.getItem('e-mapstyle') || '05f89506b62664105cf31838837fdc66',
            styles: {
                '05f89506b62664105cf31838837fdc66': {
                    title: 'MapV默认',
                    desc: 'mapv编辑器默认样式。'
                },
                'normal': {
                    title: '百度地图',
                    desc: '百度地图官网采用的地图样式。'
                },
                "6639f6523d2848ac4296ca004fd7f72a": {
                    title: '初雪白',
                    desc: '浅色模板，地图背景以蓝白色为主，明朗大方，仙气飘飘。'
                },
                "e028eb1c1d7436ab9f088b3eb51788ed": {
                    title: '烟雨濛灰',
                    desc: '浅色模板，地图背景以灰白色为主，文字标注较少，清新淡雅。'
                },
                'c8b657b9e084f120aa542d1ee208f738': {
                    title: '眼眸蓝',
                    desc: '深色模板，地图背景以深蓝色、墨绿色为主，文字标注较少，风格深邃神秘。'
                },
                "d298aa5244724c2d100c231d28753ef0": {
                    title: '绿野仙踪',
                    desc: '深色模板，地图背景以橙色、灰色为主，轮廓鲜明。'
                },
            }
        }
    },
    components: {},
    mounted: function () {
        // test
    },
    methods: {
        changeStyle: function (style) {
            map.setMapStyleV2({ styleId: style });
            this.activeStyle = style;
            localStorage.setItem('v-mapstyle', style);
        },
        closeLayer: function () {
            Action.home.emit('changeNav', null);
        }
    }
}
</script>

<style lang="scss">
.map-layers {
  overflow: hidden;
  position: absolute;
  left: 220px;
  top: 0;
  bottom: 0;
  width: 300px;
  background: #222;
  border-left: 1px solid #717070;
  .layers-fn {
    padding-bottom: 1px;
  }
  .layers-title {
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    margin: 0 15px;
    color: #b9b9b9;
    border-bottom: 1px solid #717070;
  }
  .layers-close {
    transition: all 0.3s ease;
    height: 25px;
    width: 25px;
    position: absolute;
    top: 10px;
    right: 10px;
    fill: #b9b9b9;
    cursor: pointer;
  }
}
.layers-choose {
  position: absolute;
  top: 90px;
  bottom: 0;
  overflow: auto;
  left: 0;
  right: 0;
}
.layers-mapblock-name {
  cursor: pointer;
  text-align: center;
  position: relative;
  color: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 135px;
  overflow: hidden;
  width: 220px;
  margin: 10px auto 20px auto;
  border: 2px solid #666;
  border-radius: 4px;
  &.active,
  &:hover {
    border: 2px solid #ccc;
  }
  p {
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    bottom: 0;
    z-index: 10;
    left: 0;
    right: 0;
    margin: 0;
    padding: 10px;
  }
}
</style>


