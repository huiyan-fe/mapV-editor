<template lang="pug">
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Action, Store } from "marine";
import styleConfig from "../config/styleConfig.js";
import Config from "../map/config.js";
import * as mapv from "mapv";
import { obj } from "kits-js";
export default {
  data: function() {
    return {
      mapvLayers: [],
      layerid: null
    };
  },
  computed: {
    ...mapState({
      datas: state => state.dataSources,
      layers: state => state.layers,
      edittingLayer: state => state.edittingLayer
    })
  },
  watch: {
    layers: {
      // here only desposal add or delete mapv layer
      // when layers was deleted or added
      handler: function(newVal, oldVal) {
        console.log("layers handler", newVal, this.layers);
        let _mapvLayers = obj.deepClone(this.mapvLayers);
        // let _mapvLayers = JSON.parse(JSON.stringify(this.mapvLayers));  // deep copy
        // let _layers = obj.deepClone(this.layers);
        let _layers = JSON.parse(JSON.stringify(this.layers));  // deep copy
        console.log('oooooooooooo',_layers)

        _mapvLayers.sort((a, b) => {
          a.id += "";
          b.id += "";
          return a.id.localeCompare(b.id);
        });
        _layers.sort((a, b) => {
          a.id += "";
          b.id += "";
          return a.id.localeCompare(b.id);
        });
        let deletedIds = [];
        let addedIds = [];
        let mapvIds = _mapvLayers.map(l => {
          return l.id;
        });
        let layerIds = _layers.map(l => {
          if (mapvIds.indexOf(l.id) < 0) {
            addedIds.push(l.id);
            this.addMapvLayer(l);
          }
          return l.id;
        });
        _mapvLayers.map(l => {
          if (layerIds.indexOf(l.id) < 0) {
            this.deleteMapvLayer(l);
          }
        });
      },
      deep: true
    },
    edittingLayer: {
      handler: function(newLayer, oldLayer) {
        console.log(
          "edittingLayer changed ",
          this.edittingLayer,
          newLayer,
          oldLayer
        );
        // debugger;
        if (newLayer && newLayer.id) {
          if (!oldLayer || !oldLayer.id || newLayer.id != oldLayer.id) {
            this.layerid = this.edittingLayer.id;
            this.config =
              this.edittingLayer.config &&
              JSON.parse(JSON.stringify(this.edittingLayer.config));
            this.updateLayerData();
          } else if (
            !oldLayer.config ||
            JSON.stringify(newLayer.config) !== JSON.stringify(oldLayer.config)
          ) {
            this.updateConfig(newLayer.config);
          } else {
          }
        }
      },
      deep: true
    },
    updateZindex() {
      this.mapvLayers.forEach(list => {
        if (list.mapv) {
          const zIndex = list.zIndex;
          // console.log(list.mapv.getOption)
          list.mapv.update({
            options: {
              zIndex
            }
          });
        }
      });
    }
  },
  methods: {
    addMapvLayer(_layer) {
      let layer = obj.deepClone(_layer);
      const dataSet = new mapv.DataSet(layer.data.data);
      layer.mapv = new mapv.baiduMapLayer(map, dataSet, {
        zIndex: layer.zIndex
      });
      // console.log(layer.mapv)
      if (layer.layerHide) {
        layer.mapv.hide();
      }
      this.mapvLayers.push(layer);
    },
    deleteMapvLayer(mapvObj) {
      mapvObj.mapv.destroy();
      this.mapvLayers = this.mapvLayers.filter(l => {
        return l.id == mapvObj.id;
      });
    },
    updateAllLayerVisibility() {
      this.mapvLayers.forEach(mapvObj => {
        if (mapvObj.mapv) {
          if (mapvObj.layerHide == true) {
            mapvObj.mapv.hide();
          } else {
            mapvObj.mapv.show();
          }
        } else {
          console.log("havent add mapv layer");
        }
      });
    },
    updateConfig: function(config) {
      let target = null;
      for (let i in this.mapvLayers) {
        if (this.mapvLayers[i].id === this.layerid) {
          target = this.mapvLayers[i];
          break;
        }
      }
      if (target) {
        Object.keys(config).forEach(key => {
          console.log(key, config[key]);
        });
        target.mapv.setOptions(config);
      }
    },
    updateLayerData() {
      console.log("updateLayerData", this.mapvLayers);
      let target = null;
      for (let i in this.mapvLayers) {
        if (this.mapvLayers[i].id === this.layerid) {
          target = this.mapvLayers[i];
          break;
        }
      }
      if (target && target.data && target.data.data) {
        if (target.mapv) {
          target.mapv.dataSet.set(target.data.data);
        } else {
          const dataSet = new mapv.DataSet(target.data.data);
          target.mapv = new mapv.baiduMapLayer(map, dataSet, {
            zIndex: target.zIndex
          });
          console.log("target mapv layer");
        }
        if (target.layerHide) {
          target.mapv.hide();
        }
        // set defalut options
        const defalutDrawType = target.data.data[0].geometry.type;
        if (styleConfig.styleMap[defalutDrawType]) {
          const defalutConfig = obj.deepClone(
            styleConfig.styleMap[defalutDrawType].simple.config
          );
          console.warn(defalutConfig);
          if (target.data.data.length > 100 && defalutConfig.useShadow) {
            defalutConfig.useShadow = false;
            defalutConfig.shadowBlur = 0;
          }
          defalutConfig.dataType = defalutDrawType;
          target.config = defalutConfig;
        }
      }
    }
  },
  mounted: function() {
    this.stores = [
      Store.on("home.layerFocusOn", () => {
        let target = null;
        for (let i in this.mapvLayers) {
          if (this.mapvLayers[i].id === this.layerid) {
            target = this.mapvLayers[i];
            break;
          }
        }
        if (target) {
          const datas = target.mapv.dataSet.get();
          const allPoints = [];
          datas.forEach(point => {
            switch (point.geometry.type) {
              case "Point":
                allPoints.push(
                  new BMap.Point(
                    point.geometry.coordinates[0],
                    point.geometry.coordinates[1]
                  )
                );
                break;
              case "LineString":
                point.geometry.coordinates.forEach(point => {
                  allPoints.push(new BMap.Point(point[0], point[1]));
                });
                break;
              case "Polygon":
                point.geometry.coordinates.forEach(boundary => {
                  boundary.forEach(point => {
                    allPoints.push(new BMap.Point(point[0], point[1]));
                  });
                });
                break;
              default:
                console.log(point.geometry);
            }
          });
          map.setViewport(allPoints, {
            margins: [0, 0, 0, 610]
          });
        }
      }),
      Store.on("home.layerFocusOut", () => {
        map.centerAndZoom(
          new BMap.Point(Config.center[0], Config.center[1]),
          Config.zoom
        );
      }),
      Store.on("home.getLayers", () => {
        Action.home.emit("receiveLayers", this.mapvLayers);
      }),
      Store.on("home.hideLayer", StoreData => {
        this.mapvLayers.forEach(mapvObj => {
          if (StoreData.data.id === mapvObj.id) {
            mapvObj.layerHide = true;
            if (mapvObj.mapv) {
              mapvObj.mapv.hide();
            }
          }
        });
      }),
      Store.on("home.showLayer", StoreData => {
        this.mapvLayers.forEach(mapvObj => {
          if (StoreData.data.id === mapvObj.id) {
            mapvObj.layerHide = false;
            if (mapvObj.mapv) {
              mapvObj.mapv.show();
            }
          }
        });
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
        Object.keys(config).forEach(key => {
          newConfig[key] = config[key] !== undefined ? config[key] : undefined;
        });
        this.updateConfig(newConfig);
      }),
      Store.on("home.changeData", StoreData => {
        console.log("home.changeData", this.mapvLayers, StoreData);
        let target = null;
        for (let i in this.mapvLayers) {
          if (this.mapvLayers[i].id === this.layerid) {
            target = this.mapvLayers[i];
            break;
          }
        }
        if (target) {
          target.data = StoreData.data;
          if (target.mapv) {
            target.mapv.dataSet.set(StoreData.data.data);
          } else {
            const dataSet = new mapv.DataSet(StoreData.data.data);
            target.mapv = new mapv.baiduMapLayer(map, dataSet, {
              zIndex: target.zIndex
            });
            // console.log(target.mapv)
            if (target.layerHide) {
              target.mapv.hide();
            }
          }
          // set defalut options
          const defalutDrawType = StoreData.data.data[0].geometry.type;
          if (styleConfig.styleMap[defalutDrawType]) {
            const defalutConfig = JSON.parse(
              JSON.stringify(
                styleConfig.styleMap[defalutDrawType].simple.config
              )
            );
            console.warn(defalutConfig);
            if (StoreData.data.data.length > 100 && defalutConfig.useShadow) {
              defalutConfig.useShadow = false;
              defalutConfig.shadowBlur = 0;
            }
            defalutConfig.dataType = defalutDrawType;
            target.config = defalutConfig;
          }
          Action.home.emit("initConfig", target.config);
        }
      }),
      Store.on("home.updateZIndex", StoreData => {
        this.mapvLayers.forEach(list => {
          if (list.mapv) {
            const zIndex = list.zIndex;
            // console.log(list.mapv.getOption)
            list.mapv.update({
              options: {
                zIndex
              }
            });
          }
        });
      })
    ];
  }
};
</script>

<style lang="scss"></style>
