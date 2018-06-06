<template lang="pug">
    .layers-console(v-if="layerInfo")
        .layers-console-head 
            .layers-console-title {{layerInfo.name}}
            .layers-btns
                button(:class="tableIndex===1?'active':''" @click="changeTableIndex(1)")
                    svg(viewBox="0 0 24 24")
                        path(d="M22.906 12.575l-3.462-7.794c-0.488-1.081-1.563-1.781-2.744-1.781h-9.4c-1.175 0-2.25 0.694-2.738 1.762-0.006 0.012-0.012 0.025-0.012 0.038l-3.456 7.775c-0.063 0.131-0.094 0.275-0.094 0.425v5c0 1.656 1.344 3 3 3h16c1.656 0 3-1.344 3-3v-5c0-0.15-0.031-0.294-0.094-0.425zM6.381 5.594c0.006-0.006 0.006-0.012 0.012-0.019 0.162-0.35 0.519-0.575 0.906-0.575h9.4c0.4 0 0.75 0.231 0.912 0.594l2.85 6.406h-4.462c-0.331 0-0.644 0.169-0.831 0.444l-1.706 2.556h-2.931l-1.7-2.556c-0.188-0.281-0.5-0.444-0.831-0.444h-4.463l2.844-6.406zM20 19h-16c-0.55 0-1-0.45-1-1v-4h4.463l1.7 2.556c0.188 0.281 0.5 0.444 0.831 0.444h4c0.331 0 0.644-0.169 0.831-0.444l1.7-2.556h4.475v4c0 0.55-0.45 1-1 1z")
                    | 选择数据
                button(:class="`${tableIndex===2?'active':''} ${hasBindDatas?'':'disable'}`" @click="changeTableIndex(2)")
                    svg(viewBox="0 0 24 24")
                        path(d="M20 13.662c-0.55 0-1 0.45-1 1v5.337c0 0.55-0.45 1-1 1h-14c-0.55 0-1-0.45-1-1v-14c0-0.55 0.45-1 1-1h5.337c0.55 0 1-0.45 1-1s-0.45-1-1-1h-5.337c-1.656 0-3 1.344-3 3v14c0 1.656 1.344 3 3 3h14c1.656 0 3-1.344 3-3v-5.337c0-0.556-0.45-1-1-1z")
                        path(d="M22.706 5.294l-4-4c-0.387-0.387-1.025-0.387-1.413 0l-10 10c-0.188 0.188-0.294 0.444-0.294 0.706v4c0 0.55 0.45 1 1 1h4c0.263 0 0.519-0.106 0.706-0.294l10-10c0.394-0.387 0.394-1.025 0-1.413zM11.587 15h-2.587v-2.587l9-9 2.587 2.587-9 9z")
                    | 修改样式
        .layers-console-body(:class="tableIndex===1?'':'second'")
            .layers-console-body-block
                ul
                    li(v-for="item in datas" @click="dataClick(item)" :class="item.active?'active':''")
                        span.icon
                        span {{item.name}}
                .tipsbox(v-if="datas.length < 4")
                    .tips 想要添加自定义数据? 
                    .tips 您可以通过点击左侧导航中的数据按钮
                        svg(viewBox="0 0 24 24")
                            path(d="M6.984 12v2.016h-1.969v-2.016h1.969zM6.984 8.016v1.969h-1.969v-1.969h1.969zM18.984 12v2.016h-10.969v-2.016h10.969zM18.984 8.016v1.969h-10.969v-1.969h10.969zM21 17.016v-12h-18v12h18zM21 3c1.078 0 2.016 0.938 2.016 2.016l-0.047 12c0 1.078-0.891 1.969-1.969 1.969h-5.016v2.016h-7.969v-2.016h-5.016c-1.078 0-2.016-0.891-2.016-1.969v-12c0-1.078 0.938-2.016 2.016-2.016h18z")
                        | ，进入数据管理模块，按照提示添加数据。
                    .tips 您也可以将符合规则的数据文件直接拖入到页面中快速添加数据。PS:添加完成之后别忘了在数据页面进行管理数据哦。
            .layers-console-body-block
                ConsoleStyle
</template>

<script>
import { Action, Store } from "marine";
import tools from "../tools/tools";
import ConsoleStyle from "./layers-console-style.vue";
export default {
  components: {
    ConsoleStyle
  },
  data: function() {
    return {
      layerInfo: null,
      datas: [],
      hasBindDatas: false,
      tableIndex: 1
    };
  },
  methods: {
    changeTableIndex: function(tableIndex) {
      if (this.hasBindDatas) {
        this.tableIndex = tableIndex;
      }
    },
    dataClick: function(data) {
      // create demo data
      if (data.id === 1) {
        data.data = tools.create.createPointData();
      }
      if (data.id === 2) {
        data.data = tools.create.createLineData();
      }
      //
      this.datas.forEach(item => {
        item.active = item.id === data.id;
      });
      this.hasBindDatas = true;
      this.tableIndex = 2;
      console.log("changeData", data);
      Action.home.emit("changeData", data);
    }
  },
  mounted: function() {
    Store.on("home.importData", storeData => {
      setTimeout(() => {
        // wait untill insert data, create new layer finished
        // auto choose the import data
        const datasObj = this.datas.filter(data => {
          return data.data === storeData.data;
        });
        if (datasObj.length >= 1) {
          this.dataClick(datasObj[0]);
          // foucus on the data
          Action.home.emit("layerFocusOn");
        }
      });
    });
    Store.on("home.removeLayer", StoreData => {
      this.layerInfo = null;
    });
    Store.on("home.changeActiveLayer", StoreData => {
      this.layerInfo = StoreData.data;
      this.hasBindDatas = false;
      this.datas.forEach(item => {
        if (item.id === (this.layerInfo.data && this.layerInfo.data.id)) {
          this.hasBindDatas = true;
        }
        item.active =
          item.id === (this.layerInfo.data && this.layerInfo.data.id);
      });
      this.tableIndex = this.hasBindDatas ? 2 : 1;
    });
    Store.on("home.receiveDatas", StoreData => {
      StoreData.data.forEach(item => {
        this.$set(item, "active", false);
      });
      this.datas = StoreData.data;
    });
    Action.home.emit("getDatas");
  }
};
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
    background: #505050;
    height: 87px;
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
  top: 85px;
  bottom: 0;
  width: 600px;
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

.layers-console-body-block {
  width: 300px;
  float: left;
}
</style>
