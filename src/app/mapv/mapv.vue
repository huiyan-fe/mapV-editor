<template lang="pug">
</template>

<script>
import { Action, Store } from "marine";
import styleConfig from '../config/styleConfig.js';
import Config from '../map/config.js';
import * as mapv from 'mapv';



console.log("init mapv");

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
          const allPoints = [];
          datas.forEach(point => {
            switch (point.geometry.type) {
              case 'Point':
                allPoints.push(new BMap.Point(point.geometry.coordinates[0], point.geometry.coordinates[1]));
                break;
              case 'LineString':
                point.geometry.coordinates.forEach(point => {
                  allPoints.push(new BMap.Point(point[0], point[1]));
                });
                break;
              case 'Polygon':
                point.geometry.coordinates.forEach(boundary => {
                  boundary.forEach(point => {
                    allPoints.push(new BMap.Point(point[0], point[1]));
                  });
                });
                break;
              default:
                console.log(point.geometry)
            }
          });
          map.setViewport(allPoints, {
            margins: [0, 0, 0, 610]
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
            target.mapv = new mapv.baiduMapLayer(map, dataSet, { zIndex: target.zIndex });
            // console.log(target.mapv)
            if (target.layerHide) {
              target.mapv.hide();
            }
          }
          // set defalut options
          const defalutDrawType = StoreData.data.data[0].geometry.type;
          if (styleConfig.styleMap[defalutDrawType]) {
            const defalutConfig = JSON.parse(JSON.stringify(styleConfig.styleMap[defalutDrawType].simple.config));
            defalutConfig.dataType = 'Point';
            target.config = defalutConfig;
          }
          Action.home.emit("initConfig", target.config);
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
        // console.log(StoreData.data);
        // const ids = StoreData.data;
        // ids.forEach(id => {

        //   console.log(id, this.list[id])
        // })
        // this.list[]
      })
    ];
    //
  }
};
</script>

<style lang="scss"></style>
