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
            let {file, dataType, positionType, selectLng, selectLat, selectAddr, selectCount1, selectCount2} = storeData.data;

            let data = {
                active: true,
                data: [],
                id: file.uid,
                name: file.name,
                visible: true
            };
            if (positionType === 'lnglat') {
                dataSetManager.geoPointWithCount(selectLng, selectLat, selectCount1);
                data.data = dataSetManager.getGeoData();
                Action.home.emit('receiveUploads', data);
            } else {
                // 解析地址是异步
                dataSetManager.geoAddressWithCount(selectAddr, selectCount2, rs => {
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
