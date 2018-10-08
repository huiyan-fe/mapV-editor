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
            if (positionType === 'lnglat') {
                const lngCol = selectConfig.longitude.value;
                const latCol = selectConfig.latitude.value;
                const countCol = selectConfig.count.value;
                dataSetManager.geoPointWithCount(lngCol, latCol, countCol);
                data.data = dataSetManager.getGeoData();
                Action.home.emit('receiveUploads', data);
            } else if(positionType === 'address') {
                const addrCol = selectConfig.address.value;
                const countCol = selectConfig.count.value;
                // 解析地址是异步
                dataSetManager.geoAddressWithCount(addrCol, countCol, rs => {
                    data.data = dataSetManager.getGeoData();
                    Action.home.emit('receiveUploads', data);
                });
            }
            console.log(dataSetManager.getGeoData());
        });
    }
};
</script>

<style lang="scss">

</style>
