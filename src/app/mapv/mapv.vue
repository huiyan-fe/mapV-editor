<template lang="pug">
</template>

<script>
import { Action, Store } from "marine";
import styleConfig from '../config/styleConfig.js';
import Config from '../map/config.js';
import * as mapv from 'mapv';
export default {
  data: function () {
    return {
      list: [],
      layerid: null
    };
  },
  computed: {},
  methods: {
    updateConfig: function (config) {
      let target = null;
      for (let i in this.list) {
        if (this.list[i].id === this.layerid) {
          target = this.list[i];
          break;
        }
      }
      Object.keys(config).forEach(key => {
        console.log(key, config[key])
      });
      target.mapv.setOptions(config);
    }
  },
  mounted: function () {
    this.stores = [
      Store.on('home.layerFocusOn', () => {
        let target = null;
        for (let i in this.list) {
          if (this.list[i].id === this.layerid) {
            target = this.list[i];
            break;
          }
        }
        if (target) {
          const datas = target.mapv.dataSet.get();
          const projection = map.getMapType().getProjection();
          const allPoints = [];
          datas.forEach(point => {
            switch (point.geometry.type) {
              case 'Point':
                if (point.geometry.coordinates[0] > 180) {
                  allPoints.push(projection.pointToLngLat(new BMap.Pixel(point.geometry.coordinates[0], point.geometry.coordinates[1])));
                } else {
                  allPoints.push(new BMap.Point(point.geometry.coordinates[0], point.geometry.coordinates[1]));
                }
                break;
              case 'LineString':
                point.geometry.coordinates.forEach(point => {
                  if (point[0] > 180) {
                    allPoints.push(projection.pointToLngLat(new BMap.Pixel(point[0], point[1])));
                  } else {
                    allPoints.push(new BMap.Point(point[0], point[1]));
                  }
                });
                break;
              case 'MultiLineString':
                point.geometry.coordinates.forEach(line => {
                  line.forEach(point => {
                    if (point[0] > 180) {
                      allPoints.push(projection.pointToLngLat(new BMap.Pixel(point[0], point[1])));
                    } else {
                      allPoints.push(new BMap.Point(point[0], point[1]));
                    }
                  });
                });
                break;
              case 'Polygon':
                point.geometry.coordinates.forEach(boundary => {
                  boundary.forEach(point => {
                    if (point[0] > 180) {
                      allPoints.push(projection.pointToLngLat(new BMap.Pixel(point[0], point[1])));
                    } else {
                      allPoints.push(new BMap.Point(point[0], point[1]));
                    }
                  });
                });
                break;
              default:
                console.log(point.geometry)
            }
          });
          map.setViewport(allPoints, {
            margins: [0, 0, 0, 300]
          });
        }
      }),
      Store.on('home.layerFocusOut', () => {
        map.centerAndZoom(new BMap.Point(Config.center[0], Config.center[1]), Config.zoom);
      }),
      Store.on("home.getLayers", () => {
        Action.home.emit("receiveLayers", this.list);
      }),
      Store.on('home.hideLayer', StoreData => {
        this.list.forEach(mapvObj => {
          if (StoreData.data.id === mapvObj.id) {
            mapvObj.layerHide = true;
            if (mapvObj.mapv) {
              mapvObj.mapv.hide();
            }
          }
        });
      }),
      Store.on('home.showLayer', StoreData => {
        this.list.forEach(mapvObj => {
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
        let target = null;
        for (let i in this.list) {
          if (this.list[i].id === this.layerid) {
            target = this.list[i];
            break;
          }
        }
        if (target) {
          this.$set(target, 'data', StoreData.data);
          if (target.mapv) {
            target.mapv.dataSet.set(StoreData.data.data);
          } else {
            const dataSet = new mapv.DataSet(StoreData.data.data);
            target.mapv = new mapv.baiduMapLayer(map, dataSet, { zIndex: target.zIndex });
            // console.log(target.mapv)
            if (target.layerHide) {
              target.mapv.hide();
            }
          }
          // set defalut options
          const defalutDrawType = StoreData.data.data[0].geometry.type;
          if (styleConfig.styleMap[defalutDrawType]) {
            let defalutConfig = JSON.parse(JSON.stringify(styleConfig.styleMap[defalutDrawType].simple.config));
            if (StoreData.data.options) {
              const options = StoreData.data.options;
              const draw = options.draw || 'simple';
              defalutConfig = JSON.parse(JSON.stringify(styleConfig.styleMap[defalutDrawType][draw].config));
              for (const key in options) {
                if (options.hasOwnProperty(key)) {
                  defalutConfig[key] = Number(options[key]) || options[key];
                }
              }
            }
            // console.warn(defalutConfig);
            if (StoreData.data.data.length > 100 && defalutConfig.useShadow) {
              defalutConfig.useShadow = false;
              defalutConfig.shadowBlur = 0;
              defalutConfig.shadowColor = undefined;
            }
            defalutConfig.dataType = defalutDrawType;
            target.config = defalutConfig;
          }
          Action.home.emit("initConfig", target.config);
        }
      }),
      Store.on("home.updateData", StoreData => {
        let target = null;
        for (let i in this.list) {
          if (this.list[i].id === this.layerid) {
            target = this.list[i];
            break;
          }
        }
        if (target) {
          this.$set(target, 'data', StoreData.data);
          if (target.mapv) {
            target.mapv.dataSet.set(StoreData.data.data);
          }
        }
      }),
      Store.on("home.updateZIndex", StoreData => {
        this.list.forEach(list => {
          if (list.mapv) {
            const zIndex = list.zIndex;
            // console.log(list.mapv.getOption)
            list.mapv.update({
              options: {
                zIndex
              }
            })
          }
        });
      })
    ];
  },
  beforeDestroy() {
    this.stores.forEach(store=>store());
  }
};
</script>

<style lang="scss"></style>
