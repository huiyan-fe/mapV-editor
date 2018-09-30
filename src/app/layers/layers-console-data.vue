<template lang="pug">
    md-dialog.data-transform(
        :md-active.sync="showDialog"
        :md-click-outside-to-close="false"
    )
        md-dialog-title 新建图层
        div.dialog-body
            el-radio-group.radio-btn-gp(v-model="dataTab" @change="changeDataTab")
                el-radio-button(label="1") 上传数据
                el-radio-button(label="2") 查看示例数据
            div(v-if="dataTab === '1'")
                el-row.data-type
                    el-col(:span="6") 
                        span.type-title 选择数据类型: 
                    el-col(:span="18") 
                        el-radio-group(v-model="dataType" @change="changeDataType")
                            el-radio(label="point") 点
                            el-radio(label="line") 线
                            el-radio(label="polygon") 面
                el-row.data-upload
                    el-col(:span="24") 
                        span.upload-title 上传文件
                        el-tooltip(effect="dark" placement="right")
                            div.tip-content(slot="content") 
                                p asad 
                                p ddd
                            a(href="javascript:") 文件说明
                    el-col(:span="24") 
                        el-upload(drag action="" :before-upload="beforeUpload")
                            i.el-icon-upload(v-if="!uploadFile")
                            div.el-upload__text(v-if="!uploadFile") 将文件拖到此处，或
                                em 点击上传
                            div.el-upload__tip(slot="tip" v-if="!uploadFile") 请上传 {{dataType}}数据 的文件
                            i.el-icon-success(v-if="uploadFile")
                            div.el-upload__text(v-if="uploadFile") 文件上传成功！
                            div.el-upload__tip(slot="tip" v-if="uploadFile") 已上传 {{uploadFile.name}}
                el-row.data-input
                    el-col(:span="6") 
                        span.input-title 选择字段名: 
                    el-col(:span="18")
                        el-radio-group(v-model="positionType")
                            el-radio(label="lnglat") 经纬度
                            el-radio(label="address") 位置
                el-row.data-select(v-if="positionType === 'lnglat'")
                    el-col(:span="6")
                        div.input-title 经度: 
                    el-col(:span="18")
                        el-select.pos-input(placeholder="经度lng" v-model="selectLng")
                            el-option(v-for="item in selectOptions" :key="item" :label="item" :value="item")
                    el-col(:span="6")
                        div.input-title 纬度: 
                    el-col(:span="18")
                        el-select.pos-input(placeholder="纬度lat" v-model="selectLat")
                            el-option(v-for="item in selectOptions" :key="item" :label="item" :value="item")
                    el-col(:span="6")
                        div.input-title 权重: 
                    el-col(:span="18")
                        el-select.pos-input(placeholder="权重count" v-model="selectCount1")
                            el-option(v-for="item in selectOptions" :key="item" :label="item" :value="item")
                el-row.data-select(v-if="positionType === 'address'")
                    el-col(:span="6")
                        div.input-title 位置: 
                    el-col(:span="18")
                        el-select.pos-input(placeholder="位置address" v-model="selectAddr")
                            el-option(v-for="item in selectOptions" :key="item" :label="item" :value="item")
                    el-col(:span="6")
                        div.input-title 权重: 
                    el-col(:span="18")
                        el-select.pos-input(placeholder="权重count" v-model="selectCount2")
                            el-option(v-for="item in selectOptions" :key="item" :label="item" :value="item")
            div(v-if="dataTab === '2'")
                el-row.data-type
                    el-col(:span="6") 
                        span.type-title 示例数据类型: 
                    el-col(:span="18") 
                        el-radio-group(v-model="exampleType")
                            el-radio(v-for="item in datas" :label="item.id" @change="changeExample(item)" :key="item.id") {{item.name}}
        md-dialog-actions
            md-button.md-primary(@click="cancelDialog") 取消
            md-button.md-primary(@click="submitImport") 导入数据
</template>

<script>
import { Action, Store } from 'marine';
import tools from '../tools/tools';

export default {
    props: ["list"],
    data: function() {
        return {
            layerInfo: null,
            showDialog: false,
            dataTab: '1',
            dataType: 'point',
            positionType: 'lnglat',
            selectOptions: [],
            selectLng: null,
            selectLat: null,
            selectAddr: null,
            selectCount1: null,
            selectCount2: null,
            exampleType: 1,
            datas: [],
            ExampleData: null,
            uploadFile: null,
            uploadData: null
        }
    },
    methods: {
        clearData: function() {
            this.selectOptions = [];
            this.selectLng = null;
            this.selectLat = null;
            this.selectAddr = null;
            this.selectCount1 = null;
            this.selectCount2 = null;
            this.uploadFile = null;
            this.uploadData = null;
        },
        changeDataTab: function(tab) {
            console.log(tab)
        },
        changeDataType: function(type) {
            this.clearData();
        },
        changeExample: function(data) {
            this.ExampleData = data;
        },
        beforeUpload: function(file) {
            this.clearData();
            this.uploadFile = file;
            Action.home.emit('getSelects', file);
            return false;
        },
        cancelDialog: function(e) {
            this.list.forEach((item, index) => {
                if (this.layerInfo === item) {
                    const mapvtraget = this.list.splice(index, 1);
                    if (mapvtraget[0].mapv) {
                        mapvtraget[0].mapv.destroy();
                    }
                }
            });
            Action.home.emit('removeLayer', this.layerInfo);
            this.clearData();
            this.showDialog = false;
        },
        submitImport: function(e) {
            if (this.dataTab == 2) {
                // example datas
                const data = this.ExampleData;
                if (data.id === 1) {
                    data.data = tools.create.createPointData();
                }
                if (data.id === 2) {
                    data.data = tools.create.createLineData();
                }
                //
                this.datas.forEach(item => {
                    item.active = item.id === data.id
                });
                
                Action.home.emit('changeData', data);
                // Action.home.emit('submitImport', this.layerInfo);
            } else {
                //upload datas
                if (!this.uploadFile) {
                    this.$message.error('您还没有上传文件！');
                    return false;
                } else if (this.positionType == 'lnglat' && !(this.selectLng && this.selectLat && this.selectCount1)
                || this.positionType == 'address' && !(this.selectAddr && this.selectCount2)) {
                    this.$message.error('请正确选择解析文件的字段名！');
                    return false;
                }
                let options = {
                    layerInfo: this.layerInfo,
                    file: this.uploadFile,
                    dataType: this.dataType,
                    positionType: this.positionType,
                    selectLng: this.selectLng,
                    selectLat: this.selectLat,
                    selectAddr: this.selectAddr,
                    selectCount1: this.selectCount1,
                    selectCount2: this.selectCount2,
                };
                Action.home.emit('getUploads', options);
            }
            this.clearData();
            this.showDialog = false;
        }
    },
    mounted: function() {
        Store.on("home.addNewLayer", storeData => {
            this.layerInfo = storeData.data;
            this.showDialog = true;
        });

        Store.on("home.receiveSelects", storeData => {
            this.selectOptions = storeData.data;
        });

        Store.on("home.receiveUploads", storeData => {
            this.uploadData = storeData.data;
            Action.home.emit('changeData', this.uploadData);
            // Action.home.emit('submitImport', this.layerInfo);
        });

        Store.on('home.receiveDatas', StoreData => {
            StoreData.data.forEach(item => {
                this.$set(item, 'active', false)
            })
            this.datas = StoreData.data;
            this.ExampleData = StoreData.data[0];
            console.log('guagua',this.datas)
        });
        Action.home.emit('getDatas');
    }
}
</script>

<style lang="scss">
.md-dialog .md-dialog-container {
    overflow-y: auto;
}
.dialog-body {
    padding: 0 20px;
    min-height: 400px;
    width: 600px;
}
.radio-btn-gp {
    display: block;
    text-align: center;
    margin-bottom: 20px;
}
.data-type {
    margin-bottom: 10px;
    .type-title {
        font-size: 14px;
    }
}
.data-upload {
    margin-bottom: 10px;
    .upload-title {
        font-size: 14px;
        margin-right: 10px;
    }
    .el-upload {
        display: block;
        margin-top: 5px;
        .el-upload-dragger {
            width: 100%;
            height: 120px;
            .el-icon-success,
            .el-icon-upload {
                font-size: 67px;
                color: #c0c4cc;
                margin: 20px 0 16px;
                line-height: 50px;
            }
        }
    }
}
.el-tooltip__popper {
    .tip-content {
        p {
            margin: 0;
        }
    }
}
.data-input,
.data-select {
    .input-title {
        font-size: 14px;
    }
    .pos-input {
        width: 160px;
        display: block;
        margin-top: 10px;
        .el-input__inner {
            border-color: #ddd;
            background-color: #fff;
            color: #666;
        }
    }
}
.data-select {
    .input-title {
        margin-top: 10px;
    }
}
</style>
