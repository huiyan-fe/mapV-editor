<template lang="pug">
    .layers-console(v-if="layerInfo")
        .layers-console-head 
            .layers-console-title {{layerInfo.name}} 图层样式
        .layers-console-body
            ConsoleStyle
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
    }
}
</script>

<style lang="scss">
.layers-console {
  overflow: hidden;
  position: absolute;
  left: 310px;
  top: 0;
  bottom: 0;
  width: 300px;
  background: #404040;
  .layers-console-head {
    height: 47px;
  }
  .layers-console-title {
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    margin: 0 15px;
    color: #b9b9b9;
    border-bottom: 1px solid #717070;
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
  position: absolute;
  left: 0;
  top: 27px;
  bottom: 0;
  width: 300px;
  overflow: auto;
  transition: all 0.2s ease-in;
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
  padding-top: 10px;
  color: #b9b9b9;
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
