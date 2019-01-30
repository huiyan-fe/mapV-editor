<template lang="pug">
.nav-box
    .app-nav
        .app-nav-logo(v-if="isiframe === false")
            span.logo
            span.text MAPV
        .app-nav-btn(@click="addLayer" :class="nav==='layer'?'active':''") 新建图层
        Layers
        .app-nav-btn.map(@click="changeNav('map')" :class="nav==='map'?'active':''") 地图样式设置
        //- .app-nav-block(@click="changeNav('layer')" :class="nav==='layer'?'active':''") 图层
            .svg
                svg
                    path(d="M21 17.016v-14.016h-14.016v14.016h14.016zM21 0.984c1.078 0 2.016 0.938 2.016 2.016v14.016c0 1.078-0.938 1.969-2.016 1.969h-14.016c-1.078 0-1.969-0.891-1.969-1.969v-14.016c0-1.078 0.891-2.016 1.969-2.016h14.016zM3 5.016v15.984h15.984v2.016h-15.984c-1.078 0-2.016-0.938-2.016-2.016v-15.984h2.016zM15.938 10.313l3.563 4.688h-11.016l2.766-3.516 1.969 2.344z")
        //- .app-nav-block(@click="changeNav('data')" :class="nav==='data'?'active':''") 数据
            .svg
                svg
                    path(d="M6.984 12v2.016h-1.969v-2.016h1.969zM6.984 8.016v1.969h-1.969v-1.969h1.969zM18.984 12v2.016h-10.969v-2.016h10.969zM18.984 8.016v1.969h-10.969v-1.969h10.969zM21 17.016v-12h-18v12h18zM21 3c1.078 0 2.016 0.938 2.016 2.016l-0.047 12c0 1.078-0.891 1.969-1.969 1.969h-5.016v2.016h-7.969v-2.016h-5.016c-1.078 0-2.016-0.891-2.016-1.969v-12c0-1.078 0.938-2.016 2.016-2.016h18z")
        //- .app-nav-block(@click="changeNav('map')" :class="nav==='map'?'active':''") 地图
            .svg
                svg
                    path(d="M16.359 14.016h3.375c0.141-0.656 0.281-1.313 0.281-2.016s-0.141-1.359-0.281-2.016h-3.375c0.094 0.656 0.141 1.313 0.141 2.016s-0.047 1.359-0.141 2.016zM14.578 19.547c1.828-0.609 3.422-1.922 4.359-3.563h-2.953c-0.328 1.266-0.797 2.438-1.406 3.563zM14.344 14.016c0.094-0.656 0.141-1.313 0.141-2.016s-0.047-1.359-0.141-2.016h-4.688c-0.094 0.656-0.141 1.313-0.141 2.016s0.047 1.359 0.141 2.016h4.688zM12 19.969c0.844-1.219 1.5-2.531 1.922-3.984h-3.844c0.422 1.453 1.078 2.766 1.922 3.984zM8.016 8.016c0.328-1.266 0.797-2.438 1.406-3.563-1.828 0.609-3.422 1.922-4.359 3.563h2.953zM5.063 15.984c0.938 1.641 2.531 2.953 4.359 3.563-0.609-1.125-1.078-2.297-1.406-3.563h-2.953zM4.266 14.016h3.375c-0.094-0.656-0.141-1.313-0.141-2.016s0.047-1.359 0.141-2.016h-3.375c-0.141 0.656-0.281 1.313-0.281 2.016s0.141 1.359 0.281 2.016zM12 4.031c-0.844 1.219-1.5 2.531-1.922 3.984h3.844c-0.422-1.453-1.078-2.766-1.922-3.984zM18.938 8.016c-0.938-1.641-2.531-2.953-4.359-3.563 0.609 1.125 1.078 2.297 1.406 3.563h2.953zM12 2.016c5.531 0 9.984 4.453 9.984 9.984s-4.453 9.984-9.984 9.984-9.984-4.453-9.984-9.984 4.453-9.984 9.984-9.984z")
        //- .app-nav-version(@click="showinfo()")
            .svg
                svg(viewBox="0 0 1024 1024")
                    path(d="M878.933333 1024c-8.533333 0-17.066667 0-21.333333-4.266667l-179.2-110.933333c-21.333333 8.533333-42.666667 12.8-59.733333 17.066667-34.133333 8.533333-72.533333 12.8-106.666667 12.8-260.266667 0-469.333333-209.066667-469.333333-469.333334S251.733333 0 512 0s469.333333 209.066667 469.333333 469.333333c0 55.466667-8.533333 106.666667-25.6 157.866667-8.533333 25.6-21.333333 55.466667-38.4 81.066667-12.8 21.333333-38.4 25.6-59.733333 17.066666-21.333333-12.8-25.6-38.4-17.066667-59.733333 12.8-21.333333 21.333333-42.666667 29.866667-64 12.8-42.666667 21.333333-85.333333 21.333333-128 0-213.333333-170.666667-384-384-384s-384 170.666667-384 384 170.666667 384 384 384c29.866667 0 59.733333-4.266667 85.333334-8.533333 21.333333-4.266667 46.933333-12.8 68.266666-21.333334 12.8-4.266667 25.6-4.266667 38.4 4.266667l132.266667 81.066667v-72.533334c0-25.6 17.066667-42.666667 42.666667-42.666666s42.666667 17.066667 42.666666 42.666666V981.333333c0 17.066667-8.533333 29.866667-21.333333 38.4 0 4.266667-8.533333 4.266667-17.066667 4.266667z")
                    path(d="M512 618.666667c-25.6 0-42.666667-17.066667-42.666667-42.666667V512c0-25.6 17.066667-42.666667 42.666667-42.666667 46.933333 0 85.333333-38.4 85.333333-85.333333s-38.4-85.333333-85.333333-85.333333-85.333333 38.4-85.333333 85.333333c0 25.6-17.066667 42.666667-42.666667 42.666667s-42.666667-17.066667-42.666667-42.666667c0-93.866667 76.8-170.666667 170.666667-170.666667s170.666667 76.8 170.666667 170.666667c0 81.066667-55.466667 145.066667-128 166.4v25.6c0 25.6-17.066667 42.666667-42.666667 42.666667z")
                    path(d="M512 682.666667m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z")
    md-dialog(:md-active.sync="shwoConfig")
        md-dialog-title MapV-Editor帮助
        .md-dialog-concent 
            p 欢迎使用MapV-Editor，我们希望和各位一起让MapV变得更加强大。
            P 您可以点击“新建图层”开始使用。图层是一个绘制面板，可以设置在其上绘制的位置数据及样式，多个图层之间可以相互叠加，实现更丰富的展现形式。
            p MapV-Editor使用步骤可以简单概括为以下四步：
            P 1. 创建图层
            p 2. 上传位置数据文件，支持CSV、excel格式
            p 3. 设置图层样式
            p 4. 点击保存按钮下载图片
            p 如果您对产品的使用有一些疑惑，我们为您准备了
                a(href="javascript:") 详细使用说明
                | 以及
                a(href="./examples/示例数据&文件格式说明.zip") 示例数据下载
                | 。
            p 请注意，MapV-Editor没有任何存储数据的功能，您可以安全放心的上传数据。
            p 任何和MapV-Editor相关的问题和建议可以通过
                a(href="mailto:hedongran@baidu.com") 发送邮件到hedongran@baidu.com
                | 联系我们。
    //- md-snackbar(md-position="center" :md-active.sync="showSnackbar" )
        span mapv-Editor基于
            a(href="https://github.com/huiyan-fe/mapv" target="_blank") Mapv
            | 实现，目前处于beta版本，各功能可能并不完整，仅供评估学习使用。
        md-button(class="md-primary" @click="showSnackbar = false") 关闭
</template>

<script>
import { Action, Store } from 'marine';
import Layers from '../layers/layers.vue';
const version = require('../../../package.json').version;

export default {
    data: function () {
        return {
            // duration: 4000,
            // showSnackbar: true,
            nav: null,
            shwoConfig: false,
            version,
            isiframe: false
        }
    },
    components: {
      Layers
    },
    computed: {
    },
    methods: {
        addLayer: function() {
            this.changeNav('layer');
            Action.home.emit('addLayer');
        },
        changeNav: function (data) {
            if (data !== this.nav) {
                // close layer-console active
                if (this.nav && data !== 'layer') {
                    Action.home.emit('closeLayer');
                }
                this.nav = data;
                Action.home.emit('changeNav', data);
            }
        },
        showinfo: function () {
            this.shwoConfig = true;
        }
    },
    mounted: function () {
        // setTimeout(() => {
        //     this.showSnackbar = false;
        // }, this.duration);
        
        let search = location.search.substr(1);
        if (search.length > 0) {
            search = search.split('&');
            for (var i = 0; i < search.length; i++) {
                search[i] = search[i].split('=');
                if (search[i][0] === 'isiframe') {
                    this.isiframe = true;
                    break;
                }
            }
        }

        Store.on('home.importData', (data) => {
            console.log(this.nav)
            if (this.nav !== 'layer') {
                this.nav = 'layer';
                Action.home.emit('changeNav', 'layer');
            }
        });
        Store.on("home.changeNav", StoreData => {
            this.nav = StoreData.data;
        });
    }
}
</script>

<style lang="scss">
.md-dialog {
  z-index: 2000;
}
.md-overlay {
  z-index: 1900;
}
.md-dialog-concent {
  padding: 0 20px 20px 20px;
}
.app-nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 220px;
  bottom: 0;
  background: #222;
  color: #b9b9b9;
  padding-top: 20px;
  .app-nav-logo {
    height: 40px;
    text-align: center;
    margin-bottom: 20px;
    .logo {
      width: 101px;
      height: 34px;
      margin: 0;
      background: url(./logo.png) no-repeat center;
      display: inline-block;
      background-size: contain;
    }
    .text {
      height: 18px;
      line-height: 18px;
      font-weight: 500;
      margin-left: 10px;
      border-left: 1px solid #ccc;
      text-indent: 9px;
      display: inline-block;
      font-size: 16px;
      color: #fff;
      vertical-align: super;
    }
  }
  .app-nav-btn {
    cursor: pointer;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 100px;
    background-color: transparent;
    border:1px solid #eee;
    color: #fff;
    width: 180px;
    height: 30px;
    margin: 15px 20px;
    &:hover {
      background-color: rgba(245,83,61,0.7);
      border-color: rgba(245,83,61,0.7);
    }
    &.active {
      background-color: #f5533d;
      border-color: #f5533d;
    }
  }
  .app-nav-block {
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 14px;
    cursor: pointer;
    position: relative;
    &:hover {
      .svg {
        left: -100px;
      }
    }
    background: #323232;
    &.active .svg {
      background: #323232;
    }
    .svg {
      transition: all 0.3s ease;
      height: 59px;
      width: 60px;
      position: absolute;
      top: 0;
      left: 0;
      fill: #b9b9b9;
      background: #222;
      svg {
        width: 24px;
        height: 24px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -14px;
      }
    }
  }
  .app-nav-version {
    width: 60px;
    height: 60px;
    position: absolute;
    left: 0;
    bottom: 0;
    fill: #b9b9b9;
    &:hover {
      fill: #fff;
      cursor: pointer;
    }
    svg {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -14px;
    }
  }
}
</style>
