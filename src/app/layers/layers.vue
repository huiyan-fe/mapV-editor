<template lang="pug">
    div
        .layers
            .layers-fn
                .layers-title 图层管理
                .layers-new 
                    md-button.md-raised.layers-new-btn 新建图层
            List
        Console
</template>

<script>
import List from './layers-list.vue';
import Console from './layers-console.vue';
export default {
    components: {
        List,
        Console
    }
}
</script>

<style lang="scss">
.layers {
    position: absolute;
    border-left: 1px solid #323232;
    left: 60px;
    width: 250px;
    top: 0;
    bottom: 0;
    background: #323232;
    .layers-fn {
        background: #404040;
        padding-bottom: 1px;
    }
    .layers-title {
        height: 40px;
        font-size: 16px;
        line-height: 40px;
        margin: 0 15px;
        color: #b9b9b9;
        border-bottom: 1px solid #717070;
    }
    .md-button.layers-new-btn {
        margin-top: 10px;
        width: 250px - 30px;
        height: 30px;
        line-height: 30px;
        min-height: 30px;
        box-sizing: border-box;
        font-size: 14px;
        margin-left: 15px;
        background-color: #6b6b6b;
        color: #eee; // margin-left: 15px;
    }
}
</style>
