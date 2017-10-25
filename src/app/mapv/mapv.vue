<template lang="pug">
</template>

<script>
import { Action, Store } from "marine";

console.log("init mapv");

export default {
  data: function() {
    return {
      list: [],
      layerid: null
    };
  },
  computed: {},
  methods: {
    updateConfig: function(config) {
      let target = null;
      for (let i in this.list) {
        if (this.list[i].id === this.layerid) {
          target = this.list[i];
          break;
        }
      }
      //   console.log(target, config);
      target.mapv.setOptions(config);
    }
  },
  mounted: function() {
    this.stores = [
      Store.on("home.getLayers", () => {
        Action.home.emit("receiveLayers", this.list);
      }),
      Store.on("home.changeActiveLayer", StoreData => {
        this.layerid = StoreData.data.id;
      }),
      Store.on("home.initConfig", StoreData => {
        const config = StoreData.data;
        const newConfig = JSON.parse(JSON.stringify(config));
        this.updateConfig(newConfig);
      }),
      Store.on("home.changeConfig", StoreData => {
        const config = StoreData.data;
        const newConfig = JSON.parse(JSON.stringify(config));
        this.updateConfig(newConfig);
      }),
      Store.on("home.changeData", StoreData => {
        let target = null;
        for (let i in this.list) {
          if (this.list[i].id === this.layerid) {
            target = this.list[i];
            break;
          }
        }
        if (target) {
          target.data = StoreData.data;
          if (target.mapv) {
            target.mapv.dataSet.set(StoreData.data.data);
          } else {
            const dataSet = new mapv.DataSet(StoreData.data.data);
            target.mapv = new mapv.baiduMapLayer(map, dataSet, {});
          }
          // set defalut options
          if (StoreData.data.data[0].geometry.type === "Point") {
            target.config = {
              fillStyle: "#ff3232" || "rgba(255, 50, 50, 0.6)",
              shadowColor: "#ff3232" || "rgba(255, 50, 50, 1)",
              shadowBlur: 30,
              globalCompositeOperation: "lighter",
              size: 5,
              draw: "simple",
              dataType: "Point"
            };
          } else if (StoreData.data.data[0].geometry.type === "Line") {
            target.config = {
              strokeStyle: "#fffa32" || "rgba(255, 250, 50, 0.3)",
              shadowColor: "#fffa32" || "rgba(255, 250, 50, 1)",
              shadowBlur: 20,
              lineWidth: 0.7,
              draw: "simple",
              dataType: "Line"
            };
          } else if (StoreData.data.data[0].geometry.type === "Polygon") {
            target.config = {
              fillStyle: "#ff5035",
              strokeStyle: "#faff35",
              lineWidth: 1,
              globalAlpha: 1,
              draw: "simple",
              dataType: "Polygon"
            };
          }
          Action.home.emit("initConfig", target.config);
        }
      })
    ];
    //
  }
};
</script>

<style lang="scss"></style>
