<template lang="pug">
    md-dialog.data-transform(
        :md-active.sync="dialogVisible"
        :md-click-outside-to-close="false"
    )
        md-dialog-title 新建图层
        div.dialog-body
            el-radio-group(v-model="dataTab" @change="changeRadio")
                el-radio-button(label="1") 上传数据
                el-radio-button(label="2") 查看示例数据
            div.data-type
                el-col(:span="6") 
                    span.type-title 选择数据类型: 
                el-col(:span="18") 
                    el-radio-group(v-model="dataType")
                        el-radio(label="point") 点
                        el-radio(label="line") 线
                        el-radio(label="polygon") 面
            div.data-upload
                el-col(:span="24") 
                    span.upload-title 上传文件
                    el-tooltip(effect="dark" placement="right")
                        span(slot="content") asdasdasdasdsad
                        a(href="javascript:") 文件说明
                el-col(:span="24") 
                    el-upload(drag multiple action="")
                        i.el-icon-circle-plus-outline
            div.data-input
                el-col(:span="6") 
                    span.type-title 选择数据类型: 
                el-col(:span="18")
                    el-input(placeholder="经度")
                    el-input(placeholder="维度")
                    div or
                    el-input(placeholder="位置")
        md-dialog-actions
            md-button.md-primary(@click="dialogVisible = false") 关闭
            md-button.md-primary(@click="dialogVisible = false") 导入数据
</template>

<script>
import { Action, Store } from 'marine';

export default {
    data: function() {
        return {
            dialogVisible: false,
            dataTab: 1,
            dataType: 'point'
        }
    },
    methods: {
        changeRadio: function(params) {
            console.log(params)
        }
    },
    mounted: function() {
        Store.on("home.addNewLayer", storeData => {
            console.log(storeData);
            this.dialogVisible = true;
        });
    }
}
</script>

<style lang="scss">
.dialog-body {
    padding: 0 20px;
}
</style>
