<template lang="pug">
    .layers-console-body-block
        .btns-block(v-for="(value,key) in config" v-if="configMap[key]&&configMap[key].name")
            label(v-if="configMap[key]") {{configMap[key]&&configMap[key].name}} 
            input(v-if="configMap[key]&&configMap[key].type!=='select'" 
                :type='configMap[key]&&configMap[key].type' 
                :name="key" 
                :value="value"
                :max="configMap[key]&&configMap[key].max"
                :min="configMap[key]&&configMap[key].min"
                :step="configMap[key]&&configMap[key].step"
                @change="changeconfig($event,key)"
            )
            select(v-if="configMap[key]&&configMap[key].type==='select'" @change="changeconfig($event,key)" :value="value")
                option(v-for="value in configMap[key].values" :value="value.id") {{value.name}}
            span(v-if="configMap[key]" class="layers-console-value") {{value}}
        .btns-focus
            md-button(@click="focusOn()")
              svg(viewBox="0 0 1024 1024")
                path(d="M512 374.536208c-75.797313 0-137.463792 61.666478-137.463792 137.463792 0 75.798337 61.666478 137.463792 137.463792 137.463792s137.463792-61.666478 137.463792-137.463792C649.463792 436.201663 587.797313 374.536208 512 374.536208zM512 588.06542c-41.942251 0-76.06542-34.123168-76.06542-76.06542 0-41.942251 34.123168-76.06542 76.06542-76.06542s76.06542 34.123168 76.06542 76.06542C588.06542 553.942251 553.942251 588.06542 512 588.06542z")
                path(d="M967.011055 481.300814l-5.372358 0c-3.342118-49.992601-14.866592-98.550527-34.398438-144.730289-22.701025-53.66934-55.19202-101.861946-96.569406-143.241378-41.379433-41.378409-89.572038-73.869405-143.241378-96.569406-46.179762-19.532869-94.737688-31.05632-144.731312-34.398438l0-5.372358c0-16.954137-13.745049-30.699186-30.699186-30.699186s-30.699186 13.745049-30.699186 30.699186l0 5.372358c-49.992601 3.342118-98.550527 14.866592-144.730289 34.398438-53.66934 22.700001-101.861946 55.190997-143.241378 96.569406-41.378409 41.379433-73.869405 89.572038-96.569406 143.241378-19.532869 46.179762-31.05632 94.737688-34.398438 144.730289l-5.373381 0c-16.954137 0-30.699186 13.745049-30.699186 30.699186s13.745049 30.699186 30.699186 30.699186l5.373381 0c3.342118 49.992601 14.866592 98.550527 34.398438 144.730289 22.700001 53.668317 55.190997 101.861946 96.569406 143.241378 41.379433 41.379433 89.572038 73.869405 143.241378 96.569406 46.179762 19.531845 94.737688 31.05632 144.730289 34.398438l0 5.373381c0 16.954137 13.745049 30.699186 30.699186 30.699186s30.699186-13.745049 30.699186-30.699186l0-5.373381c49.992601-3.342118 98.550527-14.866592 144.731312-34.398438 53.668317-22.701025 101.861946-55.190997 143.241378-96.569406 41.378409-41.379433 73.869405-89.572038 96.569406-143.241378 19.531845-46.179762 31.05632-94.737688 34.398438-144.730289l5.372358 0c16.954137 0 30.699186-13.745049 30.699186-30.699186S983.965192 481.300814 967.011055 481.300814zM542.699186 900.066363 542.699186 818.289871c0-16.954137-13.745049-30.699186-30.699186-30.699186s-30.699186 13.745049-30.699186 30.699186l0 81.776492c-190.218296-14.909571-342.457606-167.148881-357.367177-357.367177l81.776492 0c16.954137 0 30.699186-13.745049 30.699186-30.699186s-13.745049-30.699186-30.699186-30.699186l-81.776492 0c14.909571-190.218296 167.148881-342.457606 357.367177-357.3682l0 81.776492c0 16.954137 13.745049 30.699186 30.699186 30.699186s30.699186-13.745049 30.699186-30.699186l0-81.776492c190.219319 14.909571 342.458629 167.148881 357.3682 357.3682l-81.776492 0c-16.954137 0-30.699186 13.745049-30.699186 30.699186s13.745049 30.699186 30.699186 30.699186l81.776492 0C885.156792 732.917482 732.917482 885.156792 542.699186 900.066363z")
            md-button(@click="focusOut()")
              svg(viewBox="0 0 1024 1024")
                path(d="M512.003068 1023.934508c-282.306644 0-511.98158-229.668797-511.98158-511.964184 0-282.299481 229.674936-511.970324 511.98158-511.970324 282.299481 0 511.975441 229.664703 511.975441 511.970324C1023.978509 794.264689 794.301526 1023.934508 512.003068 1023.934508L512.003068 1023.934508zM512.003068 51.0507c-254.155491 0-460.930881 206.764134-460.930881 460.918601 0 254.144234 206.774367 460.914508 460.930881 460.914508 254.149351 0 460.924741-206.770274 460.924741-460.914508C972.927809 257.814834 766.151395 51.0507 512.003068 51.0507L512.003068 51.0507zM512.003068 1023.934508c-170.572864 0-304.186977-224.877677-304.186977-511.964184 0-287.079344 133.615137-511.970324 304.186977-511.970324 170.566724 0 304.179814 224.89098 304.179814 511.970324C816.182882 799.055808 682.569792 1023.934508 512.003068 1023.934508L512.003068 1023.934508zM512.003068 51.0507c-137.216151 0-253.136278 211.079416-253.136278 460.918601 0 249.841232 115.925243 460.914508 253.136278 460.914508 137.204895 0 253.130138-211.073276 253.130138-460.914508C765.133206 262.130116 649.207963 51.0507 512.003068 51.0507L512.003068 51.0507zM486.474648 25.52228l51.0507 0 0 972.888925-51.0507 0L486.474648 25.52228 486.474648 25.52228zM72.97401 278.529621l878.04993 0 0 51.0507-878.04993 0L72.97401 278.529621 72.97401 278.529621zM18.830879 486.442928l986.337215 0 0 51.054793-986.337215 0L18.830879 486.442928 18.830879 486.442928zM66.128091 694.349071l891.743814 0 0 51.0507-891.743814 0L66.128091 694.349071 66.128091 694.349071zM66.128091 694.349071")
               
</template>

<script>
import { Action, Store } from "marine";
import tools from "../tools/tools";
import styleConfig from "../config/styleConfig.js";
export default {
  data: function () {
    return {
      styleMap: styleConfig.styleMap,
      configMap: styleConfig.configLabelMap,
      config: {}
    };
  },
  methods: {
    focusOn: function () {
      Action.home.emit("layerFocusOn", this.config);
    },
    focusOut: function () {
      Action.home.emit("layerFocusOut", this.config);
    },
    changeconfig: function (e, key) {
      this.config[key] = e.target.value;
      Action.home.emit("changeConfig", this.config);
    },
    changeDrawType: function (key) {
      if (this.styleMap[key].config) {
        const newConfig = JSON.parse(JSON.stringify(this.styleMap[key].config));
        newConfig.dataType = this.config.dataType;

        this.config = newConfig;
      }
      this.config.draw = key;
      this.styleMap = styleConfig.styleMap[this.config.dataType];
      Action.home.emit("changeConfig", this.config);
    }
  },
  mounted: function () {
    Store.on("home.initConfig", StoreData => {
      this.config = StoreData.data;
      this.styleMap = styleConfig.styleMap[this.config.dataType];
    });

    Store.on("home.changeActiveLayer", StoreData => {
      this.config = StoreData.data.config || {};
      this.styleMap = styleConfig.styleMap[this.config.dataType];
    });
  }
};
</script>

<style lang="scss">
.layers-console-body-block {
  .md-button-toggle {
    padding: 0 10px;
    display: block;
  }
  .md-theme-default.md-button-toggle {
    button {
      color: #999;
      min-height: initial;
      min-width: initial;
      line-height: 1.6em;
      padding: 5px 12px;
      margin: 5px 5px 5px 0;
    }
    .md-toggle {
      color: white;
      background: #505050;
    }
  }
  .btns-block {
    padding: 5px 10px;
    label {
      margin-right: 10px;
    }
  }
  .layers-console-value {
    float: right;
    color: #666;
  }

  .btns-focus {
    text-align: right;
    border-top: 1px solid #505050;
    margin: 20px 10px;
    button {
      float: right;
      min-width: auto;
      margin: 5px 0;
    }
    svg {
      &:hover {
        fill: #c0c0c0;
      }
      fill: #707070;
      margin: 0;
    }
  }
}
</style>
