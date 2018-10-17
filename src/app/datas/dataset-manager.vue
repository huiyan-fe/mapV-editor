<template lang="pug">

</template>

<script>
import { Action, Store } from "marine";
import DatasetManager from 'dataset-manager';

export default {
    data: function () {
        return {
            dataset: {}
        };
    },
    mounted: function () {
        const dataSetManager = new DatasetManager();
        Store.on("home.getSelects", (storeData) => {
            console.log(storeData.data)
            var file = storeData.data;
            var fileName = file.name;
            var fr = new FileReader() ;

            if (fileName.indexOf('.csv') > -1) {
                fr.readAsText(file);
            } else {
                fr.readAsBinaryString(file);
            }

            fr.onload = function(e) {
                var rs = e.target.result;
                if (fileName.indexOf('.csv') > -1) {
                    dataSetManager.importCSV(rs);
                } else {
                    dataSetManager.importXLSX(rs);
                }
                let selects = dataSetManager.getFields();
                Action.home.emit('receiveSelects', selects);
            }
        });

        Store.on("home.getUploads", storeData => {
            let {file, dataType, positionType, selectConfig} = storeData.data;
            console.log(selectConfig)

            let data = {
                active: true,
                data: [],
                id: file.uid,
                name: file.name,
                visible: true
            };

            // 解析点数据
            if (dataType === 'Point') {
                if (positionType === 'lnglat') {
                    const lngCol = selectConfig.longitude.value;
                    const latCol = selectConfig.latitude.value;
                    const countCol = selectConfig.count.value;
                    // 解析坐标是同步
                    dataSetManager.geoPoint(lngCol, latCol, countCol);
                    data.data = dataSetManager.getGeoData();
                    Action.home.emit('receiveUploads', data);
                } else if(positionType === 'address') {
                    const addrCol = selectConfig.address.value;
                    const countCol = selectConfig.count.value;
                    // 解析地址是异步
                    dataSetManager.geoAddress(addrCol, countCol, rs => {
                        data.data = dataSetManager.getGeoData();
                        Action.home.emit('receiveUploads', data);
                    });
                } else {
                    console.error('解析数据类型错误!');
                }
            // 解析线数据
            } else if (dataType === 'LineString') {
                if (positionType === 'lnglat') {
                    const lngSCol = selectConfig.longitudeStart.value;
                    const latSCol = selectConfig.latitudeStart.value;
                    const lngECol = selectConfig.longitudeEnd.value;
                    const latECol = selectConfig.latitudeEnd.value;
                    const countCol = selectConfig.count.value;
                    // 解析坐标是同步
                    dataSetManager.geoLine(lngSCol, latSCol, lngECol, latECol, countCol);
                    data.data = dataSetManager.getGeoData();
                    Action.home.emit('receiveUploads', data);
                } else if(positionType === 'geostring') {
                    const geoCol = selectConfig.geostring.value;
                    const countCol = selectConfig.count.value;
                    // 解析坐标是同步
                    dataSetManager.geoMultiLineString(geoCol, countCol);
                    data.data = dataSetManager.getGeoData();
                    Action.home.emit('receiveUploads', data);
                } else if(positionType === 'od') {
                    const startCol = selectConfig.start.value;
                    const endCol = selectConfig.end.value;
                    const countCol = selectConfig.count.value;
                    // 解析地址是异步
                    dataSetManager.geoOd(startCol, endCol, countCol, rs => {
                        data.data = dataSetManager.getGeoData();
                        Action.home.emit('receiveUploads', data);
                    });
                } else {
                    console.error('解析数据类型错误!');
                }
            // 解析面数据
            } else {
                if (positionType === 'geostring') {
                    const geoCol = selectConfig.geostring.value;
                    const countCol = selectConfig.count.value;
                    // 解析坐标是同步
                    dataSetManager.geoPolygon(geoCol, countCol);
                    data.data = dataSetManager.getGeoData();
                    Action.home.emit('receiveUploads', data);
                } else if(positionType === 'od') {
                    const boundaryCol = selectConfig.boundary.value;
                    const countCol = selectConfig.count.value;
                    // 解析地址是异步
                    dataSetManager.geoBoundary(boundaryCol, countCol, rs => {
                        data.data = dataSetManager.getGeoData();
                        Action.home.emit('receiveUploads', data);
                    });
                } else {
                    console.error('解析数据类型错误!');
                }
            }
            console.log(dataSetManager.getGeoData());
        });
    }
};
</script>

<style lang="scss">

</style>
