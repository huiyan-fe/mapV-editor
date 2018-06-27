<template lang="pug">
  Transfor(:importData="importData")
</template>

<script>
import { Action, Store } from "marine";
import { mapState, mapActions } from "vuex";
import defaultDatas from "../store/defaultDatas.js";
import Transfor from "./datasTransform.vue";

export default {
  data: function() {
    return {
      importData: false
    };
  },
  computed: {
    ...mapState({
      datas: state => state.dataSources,
      layers: "layers",
      test(state) {
        let s = "data Core Test,data len:" + state.dataSources.length;
        return s;
      }
    })
  },
  methods: {
    ...mapActions(["changeLayerProperty"]),
    ...mapActions({
      addData: "addData" // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
    addDataToSource: function(
      data,
      name = `用户导入数据 - ${this.datas.length - 2}`
    ) {
      this.addData({
        data,
        name
      });
    },
    changeNav: function(data) {
      this.nav = data;
      Action.home.emit("changeNav", data);
    }
  },
  components: {
    Transfor
  },
  mounted: function() {
    defaultDatas.map(d => {
      this.addDataToSource(d.data, d.name);
    });
    // Store.on("home.getDatas", () => {
    //   console.log("home.getDatas", 1);
    //   Action.home.emit("receiveDatas", this.datas);
    // });

    Store.on("home.importData", storeData => {
      console.warn("datasCore importData");
      this.addDataToSource(storeData.data);
    });

    Store.on("home.cancelImport", () => {
      this.importData = false;
    });

    window.addEventListener("drag", e => {
      e.preventDefault();
    });

    window.addEventListener("dragover", e => {
      e.preventDefault();
    });

    window.addEventListener("drop", e => {
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        var reader = new FileReader();
        reader.onload = () => {
          let isJSON = true;
          let jsonData;
          try {
            jsonData = JSON.parse(reader.result);
          } catch (e) {
            isJSON = false;
          }
          if (isJSON) {
            this.addDataToSource(jsonData);
          } else {
            this.importData = reader.result;
          }
        };
        reader.readAsText(files[0]);
      }
      e.preventDefault();
    });

    window.addEventListener("paste", e => {
      this.importData = e.clipboardData.getData("Text");
    });
  }
};
</script>

<style lang="scss">
</style>
