<template lang="pug">

</template>

<script>
import { Action, Store } from "marine";
import datas from "./defaultDatas.js";

export default {
    data: function () {
        return {
            datas: []
        };
    },
    props: ['nav'],
    computed: {},
    methods: {
        changeNav: function (data) {
            this.nav = data;
            Action.home.emit("changeNav", data);
        }
    },
    mounted: function () {
        Store.on("home.getDatas", () => {
            Action.home.emit("receiveDatas", datas);
        });

        // 
        window.addEventListener('drag', e => {
            e.preventDefault();
        });

        window.addEventListener('dragover', e => {
            e.preventDefault();
        });

        window.addEventListener('drop', e => {
            // console.log(e.dataTransfer.files);
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
                    }
                }
                reader.readAsText(files[0]);
            }

            e.preventDefault();
        });
    }
};
</script>

<style lang="scss">

</style>
