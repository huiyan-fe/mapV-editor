<template lang="pug">
  md-dialog.data-transform(
      :md-active.sync="showTips"
      @md-closed='closeBox'
      :style='modalBox'
    )

    md-dialog-title(v-if="this.importData") 导入新数据 {{receiveData}}
        div.divider
            span.diviver-chose 分割方式
                select( name='lineDividerSymbol' @change="onDividerSymbolChange($event)")
                    option(
                        v-for="(item, index) in divideSymbols" 
                        :value="item.key" 
                        :selected="item.key === lineDividerSymbol ? 'selected':''"
                    ) {{item.value}}
            span.diviver-chose 分组间隔
                el-input-number.count-input( v-model="groupCount" controls-position="right" size="small" :style="{width:'100px'}")
        md-table
            md-table-row
                md-table-head(v-for="n in max" :key="n") 
                    span 数据类型{{filedTypes[n-1]}}：
                    select(value='filedTypes[n-1]' @change="typeChange($event, n-1)")
                        option(value='null' :selected="filedTypes[n-1]==='null'?'selected':''") --
                        option(value='point' :selected="filedTypes[n-1]==='point'?'selected':''") 点
                        option(value='point-mercator' :selected="filedTypes[n-1]==='point-mercator'?'selected':''") 点(墨卡托)
                        option(value='line' :selected="filedTypes[n-1]==='line'?'selected':''") 线
                        option(value='polygon' :selected="filedTypes[n-1]==='polygon'?'selected':''") 面
                        option(value='number' :selected="filedTypes[n-1]==='number'?'selected':''") 值
                        option(value='text' :selected="filedTypes[n-1]==='text'?'selected':''") 文本
                        option(value='poiName' :selected="filedTypes[n-1]==='poiName'?'selected':''") 地名
        md-table(:style="{overflow:'scroll','max-height':'300px'}")
            md-table-row(v-for="m in Math.min(5, tempData.length)" :key="m")
                md-table-cell(v-for="k in tempData[m-1]"  :key="k") {{k}}
    
    md-dialog-actions
        md-button.md-primary(@click="showTips = false") 关闭
        md-button.md-primary(@click="onImportData") 导入数据
</template>
 
<script>
import { Action, Store } from "marine";
import config from "../config/globalConfig.js";
// import Worker from "worker-loader!./geocoding.js";
// import fetchJsonp from "fetch-jsonp";
import batchGeoCoding from "./geocoding.js";
export default {
  props: ["importData"],
  data: function() {
    return {
      modalBox: { "min-width": "50%", "max-height": "80%" },
      showTips: false,
      max: 0,
      stringFiledTypes: "",
      filedTypes: [],
      tempData: [],
      divideSymbols: config.divideSymbols,
      lineDividerSymbol: config.divideSymbols[0].key,
      groupCount: 1,
      nameList: config.defaultNameList,
      geoCodedPoiList: []
    };
  },
  components: {},
  mounted: function() {},
  computed: {
    receiveData: function() {
      if (this.importData) {
        let maxWidth = 0;
        let lineCellTypes = [];
        let lines = [];
        if (this.importData instanceof Array) {
          lines = this.importData;
        } else {
          // 去除符号("/'/)
          // 替换多空格为单空格(\s+)
          lines = JSON.parse(JSON.stringify(this.importData.trim()))
            .replace(/"/gi, "")
            .replace(/'/gi, "")
            .replace(/\s+/gi, " ")
            .split("\n");
          if (lines && lines.length > 0) {
            let tl = [];
            lines.map(l => {
              tl = [...tl, ...l.split(this.lineDividerSymbol)];
            });
            if (tl && tl.length > 0) {
              lines.length = 0;
              tl.map(item => {
                item = item.trim();
                if (item !== "" && item !== null && item !== " ") {
                  lines.push(item);
                }
              });
            }
          }
        }
        // 分割依据(split principles)：
        // line split:
        //   1.\n(换行):force split into lines when meet \n
        //   2.\t(制表符):force split one line into cells when meet \t
        // cell split (in one line)：
        //   1.split principle: lineDividerSymbol
        //   2.(null): default,no split
        //   3.(\s):split by space
        //   4.(, ):split by comma
        let lineDatas = lines.map((item, index) => {
          let cellDatas = item.split("\t");
          // if not split by \t use space as the split chart
          if (cellDatas.length === 1) {
            cellDatas = cellDatas[0].split(" ");
          }
          let jointCells = [];
          for (
            let i = 0;
            i <= cellDatas.length - this.groupCount;
            i += this.groupCount
          ) {
            let con = cellDatas.slice(i, i + this.groupCount);
            jointCells.push(con.join());
          }
          cellDatas = jointCells;
          // only support the first 10 files
          // if (cellDatas.length > 10) {
          //   cellDatas = cellDatas.slice(0, 10);
          // }

          // auto choose type of this filed
          // only show the first 5 line
          if (index < Infinity) {
            cellDatas.forEach((item, fileIndex) => {
              // every line have same type or data structure
              // so we only need to maintain one line cell types :lineCellTypes
              const fileObj = (lineCellTypes[fileIndex] =
                lineCellTypes[fileIndex] || {});
              // is number
              if (/^\d+(\.?)\d*$/.test(item)) {
                fileObj.number = fileObj.number || 0;
                fileObj.number++;
              } else if (item.split(",").length >= 2) {
                const items = item.split(",");
                if (items.length === 2) {
                  // is point
                  fileObj.point = fileObj.point || 0;
                  fileObj.point++;
                } else if (items.length === 4) {
                  // is line
                  fileObj.line = fileObj.line || 0;
                  fileObj.line++;
                } else {
                  // is polygon or line
                  let totalDistance = 0;
                  const scale = 100000;
                  let startEndDistantce =
                    Math.sqrt(
                      (items[0] - items[items.length - 2]) ** 2 +
                        (items[1] - items[items.length - 1]) ** 2
                    ) * scale;
                  for (let i = 2; i < items.length; i += 2) {
                    const x1 = items[i] * scale;
                    const y1 = items[i + 1] * scale;
                    const x2 = items[i - 2] * scale;
                    const y2 = items[i - 1] * scale;
                    const d = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
                    totalDistance += d;
                  }
                  if (startEndDistantce <= totalDistance / 4) {
                    // polygon
                    fileObj.polygon = fileObj.polygon || 0;
                    fileObj.polygon++;
                  } else {
                    // line
                    fileObj.line = fileObj.line || 0;
                    fileObj.line++;
                  }
                }
              } else {
                fileObj.poiName = fileObj.poiName || 0;
                fileObj.poiName++;
                // fileObj.text = fileObj.text || 0;
                // fileObj.text++;
              }
            });
          }
          //
          maxWidth = Math.max(cellDatas.length, maxWidth);
          return cellDatas;
        });
        const usedNames = {};
        console.log("lineCellTypes", lineCellTypes);
        const filteredCellTypes = lineCellTypes.map(item => {
          let cacheName = "null";
          let cacheMax = 0;
          Object.keys(item).forEach(name => {
            if (item[name] > cacheMax) {
              cacheName = name;
              cacheMax = item[name];
            }
          });
          // console.warn(item, cacheName, cacheMax)
          if (!usedNames[cacheName]) {
            usedNames[cacheName] = true;
            return cacheName;
          } else {
            return "null";
          }
        });
        this.max = maxWidth;
        this.showTips = true;
        this.filedTypes = filteredCellTypes;
        this.tempData = lineDatas;
      }
    }
  },
  watch: {
    stringFiledTypes: {
      handler: function(newVal, oldVal) {
        if (newVal && newVal.indexOf("]") > -1) {
          newVal = typeof newVal == "string" ? JSON.parse(newVal) : newVal;
          let firstCellType = newVal[0];
          if (firstCellType == "poiName") {
            this.geoCodedPoiList.length = 0;
            let nameList = this.tempData.map(l => {
              return l[0];
            });
            console.log("start Geocoding");
            this.bufferedGetPointsByNames(nameList, poiList => {
              // this.geoCodedPoiList = poiList;
              console.log("end Geocoding");
            });
          }
        }
      },
      deep: true,
      immediate: true
    },
    filedTypes: {
      deep: true,
      immediate: true,
      handler: function(newVal, oldVal) {
        // let firstCellType = newVal[0];
        // if (firstCellType == "poiName") {
        //   let nameList = lineDatas.map(l => {
        //     return l[0];
        //   });
        //   console.log("start Geocoding");
        //   geoCodedPoiList = 0;
        //   this.bufferedGetPointsByNames(nameList, poiList => {
        //     this.geoCodedPoiList = poiList;
        //     console.log("end Geocoding");
        //     return poiList;
        //   });
        // }
      }
    }
  },
  methods: {
    bufferedGetPointsByNames: (function() {
      var bufferedList = [];
      var bufferNamelist = [];
      let callbackList = [];
      let reqStatus = {
        reqCnt: 0,
        waiting: false
      };
      return function(nameList, callback) {
        if (JSON.stringify(bufferNamelist) !== JSON.stringify(nameList)) {
          callbackList.push(callback);
          bufferNamelist = nameList;
          bufferedList = [];
          reqStatus.waiting = true;
          batchGeoCoding(nameList, poiList => {
            reqStatus.waiting = false;
            bufferedList = poiList;
            while (callbackList.length) {
              let cb = callbackList.shift();
              cb && cb(bufferedList);
            }
          });
        } else {
          if (reqStatus.waiting) {
            callbackList.push(callback);
          } else {
            callback && callback(bufferedList);
          }
        }
      };
    })(),
    webWorkerGeoCoding: function(d) {
      // let worker = new Worker(require.resolve("./geoWorker.js"));
      // setTimeout(() => {
      //   worker.postMessage({
      //     list: this.nameList,
      //     type: "geocoding"
      //   });
      // }, 1000);
      // worker.onmessage = function(e) {
      //   console.log("main receive:", e, e.data);
      // };
    },
    onDividerSymbolChange: function(e) {
      this.lineDividerSymbol = e.target.value ? e.target.value : null;
    },
    typeChange: function(e, index) {
      console.log("filedTypes change");
      this.filedTypes[index] = e.target.value;
      this.stringFiledTypes = JSON.stringify(this.filedTypes);
    },
    closeBox: function() {
      Action.home.emit("cancelImport", {});
    },
    onImportData: function() {
      this.showTips = false;
      // console.log(this.filedTypes, this.tempData)
      // const values = ["point-mercator", "poiName", "point", "line", "polygon",''];
      const valueMaps = {
        "point-mercator": "Point",
        poiName: "Point",
        point: "Point",
        line: "LineString",
        polygon: "Polygon",
        "": ""
      };
      const values = Object.keys(valueMaps);

      // valueColum record poi
      // numberColum record poi right weight
      let valueColum = null;
      let numberColum = null;
      this.filedTypes.forEach((key, index) => {
        if (values.indexOf(key) !== -1 && !valueColum) {
          valueColum = {
            key,
            index,
            type: valueMaps[key]
          };
        }

        if (key === "number" && !numberColum) {
          numberColum = {
            index
          };
        }
      });

      // const useData = [];
      const status = {
        total: 0,
        _useData: []
      };
      Object.defineProperty(status, "useData", {
        get: function() {
          return this._useData;
        },

        set: function(newValue) {
          this._useData = newValue;
          console.log(this.total, this._useData.length);
          if (this._useData.length == this.total) {
            Action.home.emit("importData", this._useData);
          }
        }
      });
      // one line represent an single complete info
      // if valueColum.key is poiName ,use geo
      const pushData = (coordinates, valueColum, numberColum, lineData) => {
        let list = JSON.parse(JSON.stringify(status.useData));
        list.push({
          geometry: {
            type: valueColum.type,
            coordinates
          },
          count: numberColum ? lineData[numberColum.index] : 0
        });
        console.log("p");
        status.useData = list;
      };
      this.tempData.forEach((lineData, ind) => {
        const originData = lineData[valueColum.index];
        if (originData) {
          let coordinates;
          if (valueColum.type === "Point") {
            coordinates = originData.split(",").splice(0, 2);
            if (valueColum.key === "point-mercator") {
              const lnglat = map
                .getMapType()
                .getProjection()
                .pointToLngLat({ x: coordinates[0], y: coordinates[1] });
              coordinates = [lnglat.lng, lnglat.lat];
              if (!(lnglat.lat < 50 && lnglat.lat > 20)) {
                console.log("!!", lnglat, originData);
              }
              pushData(coordinates, valueColum, numberColum, lineData);
            } else if (valueColum.key === "poiName") {
              let nameList = this.tempData.map(l => {
                return l[0];
              });
              this.bufferedGetPointsByNames(nameList, list => {
                console.log("l", list.length);
                status.total = list.length;
                if (list.length > 0) {
                  let poi = list[ind];
                  // if (poi.location && poi.name && poi.name == originData) {
                  if (poi && poi.location && poi.location.lng) {
                    coordinates = [poi.location.lng, poi.location.lat];
                  }
                }
                pushData(coordinates, valueColum, numberColum, lineData);
              });
            }
          }

          if (valueColum.type === "LineString") {
            const splitedData = originData.split(",");
            coordinates = [];
            for (let i = 0; i < splitedData.length; i += 2) {
              coordinates.push([splitedData[i], splitedData[i + 1]]);
            }
            pushData(coordinates, valueColum, numberColum, lineData);
          }

          if (valueColum.type === "Polygon") {
            const splitedData = originData.split(",");
            coordinates = [];
            const tempCoordinates = [];
            for (let i = 0; i < splitedData.length; i += 2) {
              tempCoordinates.push([splitedData[i], splitedData[i + 1]]);
            }
            coordinates.push(tempCoordinates);
            pushData(coordinates, valueColum, numberColum, lineData);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.data-transform {
  font-size: 12px;
  table {
    font-size: 12px;
  }
}
.divider {
  text-align: right;
  margin-right: 10px;
  .diviver-chose {
    font-size: 12px;
    margin-left: 5px;
  }
  .count-input {
    span[role="button"] {
      background: #f5f7fa;
      color: black;
    }
    input {
      color: black;
      background: none;
    }
  }
}
.paste-list {
  overflow: scroll;
}
</style>
