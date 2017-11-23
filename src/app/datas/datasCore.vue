<template lang="pug">
Transfor(:importData="importData")
</template>

<script>
import { Action, Store } from "marine";
import datas from "./defaultDatas.js";
import Transfor from './datasTransform.vue';

export default {
    data: function () {
        return {
            importData: false
        };
    },
    computed: {},
    methods: {
        changeNav: function (data) {
            this.nav = data;
            Action.home.emit("changeNav", data);
        }
    },
    components: {
        Transfor
    },
    mounted: function () {
        Store.on("home.getDatas", () => {
            Action.home.emit("receiveDatas", datas);
        });

        Store.on('home.importData', (storeData) => {
            this.userDataIndex = this.userDataIndex || 0;
            datas.push({
                id: `userData_${Math.random()}`,
                name: `用户自定义数据 - ${++this.userDataIndex}`,
                data: storeData.data
            });
        })

        Store.on('home.cancelImport', () => {
            this.importData = false;
        })

        // 
        window.addEventListener('drag', e => {
            e.preventDefault();
        });

        window.addEventListener('dragover', e => {
            e.preventDefault();
        });

        window.addEventListener('drop', e => {
            const files = e.dataTransfer.files;
            if (files && files.length > 0) {
                var reader = new FileReader();
                reader.onload = () => {
                    let isJSON = true;
                    let jsonData;
                    try {
                        jsonData = JSON.parse(reader.result);
                    } catch (e) {
                        isJSON = false;
                    }
                    if (isJSON) {
                        this.userDataIndex = this.userDataIndex || 0;
                        datas.push({
                            id: `userData_${Math.random()}`,
                            name: `用户自定义数据 - ${++this.userDataIndex}`,
                            data: jsonData
                        });
                    } else {
                        this.importData = reader.result;
                    }
                }
                reader.readAsText(files[0]);
            }
            e.preventDefault();
        });

        window.addEventListener('paste', e => {
            this.importData = e.clipboardData.getData('Text');
            console.log('xxx', e.clipboardData.getData('Text'))
        });
    }
};
</script>

<style lang="scss">

</style>
