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
                let data = dataSetManager.getData();
                if (data.length) {
                    let selects = Object.keys(data[0]);
                    Action.home.emit('receiveSelects', selects);
                }
            }
        });

        Store.on("home.getUploads", storeData => {
            let {file, dataType, positionType, selectLng, selectLat, selectAddr} = storeData.data;

            if (positionType === 'lnglat') {
                dataSetManager.geoPoint(selectLng, selectLat);
            } else {
                dataSetManager.geoAddress(selectAddr, rs => {
                    console.log(rs)
                });
            }
            console.log(dataSetManager.getData());
            let data = {
                active: true,
                data: dataSetManager.getData(),
                id: file.uid,
                name: file.name,
                visible: true
            };
            Action.home.emit('receiveUploads', data);
        });
    }
};
</script>

<style lang="scss">

</style>
