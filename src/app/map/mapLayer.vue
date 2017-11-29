<template lang="pug">
.layers
    .layers-fn
        .layers-title 底图管理
        .layers-new 
            md-button.md-raised.layers-new-btn 请选择底图样式
    .layers-choose
        .layers-block(v-for="(item, index) in styles")
            div(@click="changeStyle(index)" :class="index===activeStyle?'layers-mapblock-name active':'layers-mapblock-name'") 
                img(:src="'http://api.map.baidu.com/customimage/staticmap?center=116.3975,39.9087&zoom=10&width=220&height=135&customid='+index+'&scaler=1'")
                p {{item.title}}

</template>


<script>
export default {
    data: function () {
        return {
            activeStyle: localStorage.getItem('e-mapstyle') || 'visualization',
            styles: {
                'visualization': {
                    title: '默认',
                    desc: '百度地图官网采用的地图样式。'
                },
                'normal': {
                    title: '百度地图',
                    desc: '百度地图官网采用的地图样式。'
                },
                "light": {
                    title: '清新蓝风格',
                    desc: '地图背景及道路均呈蓝色，给人以清新的感觉。'
                },
                "dark": {
                    title: '黑夜风格',
                    desc: '地图背景及道路均呈黑灰色，给人以寂静的感觉。'
                },
                "redalert": {
                    title: '红色警戒风格',
                    desc: '地图呈大红色，红色警戒,给人高度惊醒的感觉。'
                },
                'googlelite': {
                    title: '精简风格',
                    desc: '地图用色与google类似，不过过滤了一部分地图元素。'
                },
                "grassgreen": {
                    title: '自然绿风格',
                    desc: '陆地呈草绿色，海洋呈蓝色，道路为白色，整幅地图自然气息十足。'
                },
                "midnight": {
                    title: '午夜蓝风格',
                    desc: '地图背景呈深蓝色，水系为黑色，整体呈暗色风格。'
                },
                "pink": {
                    title: '浪漫粉风格',
                    desc: '地图为粉色、道路灰色，整体颜色柔和。'
                },
                "darkgreen": {
                    title: '青春绿风格',
                    desc: '地图背景为绿色、水系为黑色，标注为白色，地图用色浓重，时尚大气。'
                },
                "bluish": {
                    title: '清新蓝绿风格',
                    desc: '地图背景以蓝色为主色调，水系为白色，清新典雅。'
                },
                "grayscale": {
                    title: '高端灰风格',
                    desc: '地图整体成灰白色，使用该类地图便于突出其上叠加的个人信息。'
                },
                'hardedge': {
                    title: '强边界风格',
                    desc: '地图整体成白色，使用强烈的黑色边框,给人以强烈的轮廓感。'
                }
            }
        }
    },
    components: {},
    mounted: function () {
        // test
    },
    methods: {
        changeStyle: function (style) {
            map.setMapStyle({ style: style });
            this.activeStyle = style;
            localStorage.setItem('e-mapstyle', style);
        }
    }
}
</script>

<style lang="scss">
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


