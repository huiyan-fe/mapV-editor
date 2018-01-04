<template lang="pug">
  md-dialog.data-transform(
      :md-active.sync="showTips"
      @md-closed='closeBox'
    )
    md-dialog-title(v-if="this.importData") 导入新数据 {{receiveData}}
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
            md-table-row(v-for="m in Math.min(5, tempData.length)" :key="m")
                md-table-cell(v-for="k in tempData[m-1]"  :key="k") {{k}}
    md-dialog-actions
        md-button.md-primary(@click="showTips = false") 关闭
        md-button.md-primary(@click="onImportData") 导入数据
</template>
 
<script>
import { Action, Store } from "marine";
export default {
    props: ['importData'],
    data: function () {
        return {
            showTips: false,
            max: 0,
            filedTypes: [],
        }
    },
    components: {},
    computed: {
        receiveData: function () {
            if (this.importData) {
                let maxWidth = 0;
                let filedTypeAnalysis = [];
                const dataByLine = this.importData.split('\n').map((item, index) => {
                    let dataByTable = item.split('\t');
                    // if not split by \t use space as the split chart
                    dataByTable = dataByTable.length === 1 ? dataByTable[0].split(' ') : dataByTable;
                    // only support the first 10 files
                    if (dataByTable.length > 10) {
                        dataByTable = dataByTable.slice(0, 10);
                    }

                    // auto choose type of this filed
                    // only show the first 5 line
                    if (index < 5) {
                        console.log(dataByTable)
                        dataByTable.forEach((item, fileIndex) => {
                            const fileObj = filedTypeAnalysis[fileIndex] = filedTypeAnalysis[fileIndex] || {};
                            // is number
                            if (/^\d+(\.?)\d*$/.test(item)) {
                                fileObj.number = fileObj.number || 0;
                                fileObj.number++;
                            } else if (item.split(',').length >= 2) {
                                const items = item.split(',');
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
                                    let startEndDistantce = Math.sqrt((items[0] - items[items.length - 2]) ** 2 + (items[1] - items[items.length - 1]) ** 2) * scale;
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
                                fileObj.text = fileObj.text || 0;
                                fileObj.text++;
                            }
                        });
                    }
                    //
                    maxWidth = Math.max(dataByTable.length, maxWidth);
                    return dataByTable;
                });
                const usedNames = {};
                // console.log(filedTypeAnalysis)
                const filedType = filedTypeAnalysis.map(item => {
                    let cacheName = 'null';
                    let cacheMax = 0;
                    Object.keys(item).forEach(name => {
                        // console.log(item[name])
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
                        return 'null';
                    }
                });
                this.filedTypes = filedType;
                console.warn('@@@@@', maxWidth)
                this.max = maxWidth;
                this.showTips = true;
                this.tempData = dataByLine;
            }
        }
    },
    methods: {
        typeChange: function (e, index) {
            this.filedTypes[index] = e.target.value;
        },
        closeBox: function () {
            Action.home.emit('cancelImport', {})
        },
        onImportData: function () {
            this.showTips = false;
            // console.log(this.filedTypes, this.tempData)
            const values = ['point-mercator', 'point', 'line', 'polygon'];
            const valueMaps = {
                'point-mercator': 'Point',
                'point': 'Point',
                'line': 'LineString',
                'polygon': 'Polygon'
            }

            let valueColum = null;
            let numberColum = null;
            console.log(this.filedTypes)
            this.filedTypes.forEach((key, index) => {
                if (values.indexOf(key) !== -1 && !valueColum) {
                    valueColum = {
                        key,
                        index,
                        type: valueMaps[key],
                    }
                }

                if (key === 'number' && !numberColum) {
                    numberColum = {
                        index
                    }
                }
            });

            console.log(valueColum)
            const useData = [];
            this.tempData.forEach(item => {

                const originData = item[valueColum.index];
                if (originData) {
                    let coordinates;
                    if (valueColum.type === 'Point') {
                        coordinates = originData.split(',').splice(0, 2);
                        if (valueColum.key === 'point-mercator') {
                            const lnglat = map.getMapType().getProjection().pointToLngLat({ x: coordinates[0], y: coordinates[1] })
                            coordinates = [lnglat.lng, lnglat.lat];
                            if (!(lnglat.lat < 50 && lnglat.lat > 20)) {
                                console.log('!!', lnglat, originData)
                            }
                        }
                    }

                    if (valueColum.type === 'LineString') {
                        const splitedData = originData.split(',');
                        coordinates = [];
                        for (let i = 0; i < splitedData.length; i += 2) {
                            coordinates.push([splitedData[i], splitedData[i + 1]])
                        }
                    }

                    if (valueColum.type === 'Polygon') {
                        const splitedData = originData.split(',');
                        coordinates = [];
                        const tempCoordinates = [];
                        for (let i = 0; i < splitedData.length; i += 2) {
                            tempCoordinates.push([splitedData[i], splitedData[i + 1]])
                        }
                        coordinates.push(tempCoordinates);
                    }

                    useData.push({
                        "geometry": {
                            "type": valueColum.type,
                            coordinates
                        },
                        "count": numberColum ? item[numberColum.index] : 0
                    });
                }
            });
            Action.home.emit('importData', useData);
        }
    },
    mounted: function () {
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
</style>
