<template lang="pug">
    .layers-console(v-show="layerInfo")
        .layers-console-head 
            .layers-console-title {{layerInfo && layerInfo.name}} 图层样式
            .layers-close(@click="closeLayer")
                svg(viewBox="0 0 1024 1024")
                    path(d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z")
        .layers-console-body
            ConsoleStyle(:layerInfo="layerInfo")
</template>

<script>
import { Action, Store } from 'marine';
import ConsoleStyle from './layers-console-style.vue';
export default {
    components: {
        ConsoleStyle
    },
    data: function () {
        return {
            layerInfo: null,
            datas: [],
        }
    },
    methods: {
        closeLayer: function (params) {
            if (this.layerInfo) {
                this.layerInfo.active = false;
            }
            this.layerInfo = null;
            Action.home.emit('changeNav', null)
        }
    },
    watch: {
        layerInfo (newVal, oldVal) {
            if (oldVal == null && newVal != null) {
                Action.home.emit('changeNav', 'layer');
            }
        }
    },
    mounted: function () {
        // Store.on('home.importData', (storeData) => {
        //     setTimeout(() => {
        //         // wait untill insert data, create new layer finished
        //         // auto choose the import data
        //         const datasObj = this.datas.filter(data => {
        //             return data.data === storeData.data;
        //         })
        //         if (datasObj.length >= 1) {
        //             this.dataClick(datasObj[0]);
        //             // foucus on the data
        //             Action.home.emit("layerFocusOn");
        //         }
        //     })
        // });
        Store.on('home.removeLayer', StoreData => {
            this.layerInfo = null;
            Action.home.emit('resetActive');
        });
        Store.on('home.changeConfig', StoreData => {
            this.layerInfo.config = StoreData.data;
        });
        Store.on('home.changeActiveLayer', StoreData => {
            this.layerInfo = StoreData.data;
        });
        Store.on('home.closeLayer', StoreData => {
            if (this.layerInfo) {
                this.layerInfo.active = false;
            }
            this.layerInfo = null;
        });
    }
}
</script>

<style lang="scss">
.layers-console {
  overflow: hidden;
  position: absolute;
  left: 220px;
  top: 0;
  bottom: 0;
  z-index: 1;
  width: 300px;
  background: #222;
  border-left: 1px solid #717070;
  .layers-console-head {
    height: 47px;
  }
  .layers-console-title {
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
  .layers-btns {
    padding: 0 15px;
    button {
      cursor: pointer;
      margin-top: 10px;
      height: 37px;
      background: none;
      padding: 0 25px 0 15px;
      border: none;
      color: #b9b9b9;
      &:hover {
        background: #484848;
      }
      &.active {
        background: #404040;
      }
      font-size: 14px;
      svg {
        width: 20px;
        height: 20px;
        fill: #b9b9b9;
        margin-right: 5px;
      }
      &.disable {
        color: #7b7b7b;
        svg {
          fill: #7b7b7b;
        }
        background: #565656;
        cursor: not-allowed;
      }
    }
  }
}

.layers-console-body {
  width: 300px;
  overflow: auto;
  transition: all 0.2s ease-in;
  padding-top: 5px;
  color: #b9b9b9;
  &.second {
    left: -300px;
  }
  svg {
    width: 20px;
    height: 20px;
    fill: #b9b9b9;
    margin-right: 5px;
    path {
      stroke-width: 1;
    }
  }
  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    padding: 0 10px 0 20px;
    height: 35px;
    line-height: 35px;

    margin-top: 0 !important;
    cursor: pointer;
    font-size: 14px; // border-bottom: 1px solid #4c4b4b;
    &:hover {
      background: #454545;
    }

    &.active {
      background: #454545;
      .icon:after {
        left: 50%;
        top: 50%;
        transform: rotate(45deg);
        opacity: 1;
      }
      .icon:before {
        left: 50%;
        top: 50%;
        transform: rotate(-45deg);
        opacity: 1;
      }
    }
  }
  span {
    vertical-align: middle;
    display: inline-block;
  }

  .icon {
    vertical-align: middle;
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 16px;
    background: #666;
    margin-right: 10px;
    position: relative;
    &.active {
      background: #2e8bce;
    }
    &:before {
      transition: all 0.1s ease-out;
      content: "";
      background: white;
      width: 1px;
      height: 10px;
      left: 50%;
      top: 50%;
      margin: -5px 0 0 0px;
      position: absolute;
      transform: rotate(0deg);
      border-radius: 4px;
      opacity: 0;
    }
    &:after {
      transition: all 0.1s ease-out;
      content: "";
      background: white;
      width: 1px;
      height: 10px;
      left: 50%;
      top: 50%;
      margin: -5px 0 0 0px;
      position: absolute;
      transform: rotate(0deg);
      border-radius: 4px;
      opacity: 0;
    }
  }
  .tipsbox {
    border-top: 1px solid #505050;
    padding: 15px;
    margin-top: 10px;
  }
  .tips {
    margin: 10px 0;
    font-size: 12px;
    svg {
      margin: 0 5px;
    }
  }
}
</style>
