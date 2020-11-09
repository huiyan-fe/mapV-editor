<template lang="pug">
    md-dialog.data-transform(
        :md-active.sync="showDialog"
        :md-click-outside-to-close="false"
    )
        md-dialog-title 
            span 新建图层
            span.small 创建图层，首先需要上传位置数据
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
                            el-radio(label="Point") 点
                            el-radio(label="LineString") 线
                            el-radio(label="Polygon") 面
                el-row.data-upload
                    el-col(:span="24") 
                        span.upload-title 上传文件
                        el-tooltip(effect="dark" placement="right")
                            div.tip-content(slot="content") 
                                p 1.上传的数据文件格式为excel或csv； 
                                p 2.数据文件需设置字段名称（即列名称），且必须包含位置字段，可以是地址、坐标或者行政区名称；更多说明请参考下载文件。
                            a(href="javascript:") 文件说明
                        a.download-data(href="./assets/examples/示例数据&文件格式说明.zip") 
                            i.el-icon-download
                            span 示例数据下载
                    el-col(:span="24") 
                        el-upload(drag action="" :before-upload="beforeUpload")
                            i.el-icon-upload(v-if="!uploadFile")
                            div.el-upload__text(v-if="!uploadFile") 将文件拖到此处，或
                                em 点击上传
                            div.el-upload__tip(slot="tip" v-if="!uploadFile") 请上传 
                                em(v-if="dataType=='Point'") 点数据
                                em(v-if="dataType=='LineString'") 线数据
                                em(v-if="dataType=='Polygon'") 面数据
                                |  的文件
                            i.el-icon-success(v-if="uploadFile")
                            div.el-upload__text(v-if="uploadFile") 
                                em 文件上传成功！
                            div.el-upload__tip(slot="tip" v-if="uploadFile") 已上传 {{uploadFile.name}}
                el-row.data-input(v-if="uploadFile")
                    el-col(:span="6")
                        span.input-title 选择字段名: 
                    el-col(:span="18")
                        el-radio-group(v-model="positionType")
                            el-radio(v-for="(value, key) in rConfig" :key="key" :label="key" @change="changePositionType(value)") {{value.name}}
                el-row.data-select(v-if="uploadFile" v-for="(value, key) in sConfig" :key="key")
                    el-col(:span="6")
                        span.input-required(:class="key!=='count'?'':'hidden'") *
                        span.input-title {{value.title}}: 
                    el-col(:span="18")
                        el-select.pos-input(:placeholder="value.placeholder" v-model="value.value")
                            el-option(v-for="item in selectOptions" :key="item" :label="item" :value="item")
            
            div(v-if="dataTab === '2'")
                el-row.data-type
                    el-col(:span="6") 
                        span.type-title 示例数据类型: 
                    el-col(:span="18") 
                        el-radio-group(v-model="exampleType")
                            el-radio(v-for="item in exampleDatas" :label="item.id" @change="changeExample(item)" :key="item.id") {{item.name}}
                el-row
                    img(:src="`./static/images/layers/example-${exampleType}.png`")
        md-dialog-actions
            md-button.md-primary(@click="cancelDialog") 取消
            md-button.md-primary(@click="submitImport") 导入数据
</template>

<script>
import { Action, Store } from 'marine';
import tools from '../tools/tools';
import selectConfig from "../config/selectConfig.js";

export default {
    props: ["list"],
    data: function() {
        return {
            layerInfo: null,
            showDialog: false,
            dataTab: '1',
            dataType: 'Point',
            positionType: 'lnglat',
            selectMap: selectConfig.selectMap,
            rConfig: selectConfig.selectMap.Point,
            sConfig: {},
            selectOptions: [],
            exampleType: 1,
            exampleDatas: [],
            exampleData: null,
            uploadFile: null
        }
    },
    methods: {
        clearData: function() {
            this.selectOptions = [];
            this.uploadFile = null;
            for (const i in this.sConfig) {
                if (this.sConfig.hasOwnProperty(i)) {
                    this.sConfig[i].value = "";
                }
            }
        },
        changeDataTab: function(tab) {
            console.log(tab)
        },
        changeDataType: function(type) {
            // this.clearData();
            this.rConfig = this.selectMap[type];
            this.positionType = Object.keys(this.rConfig)[0];
            this.sConfig = this.rConfig[this.positionType] && this.rConfig[this.positionType].children;
        },
        changePositionType: function(type) {
            this.sConfig = type.children || {};
        },
        changeExample: function(data) {
            this.exampleData = data;
            console.log(this.exampleData)
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
                const data = this.exampleData;
                if (data.id === 1) {
                    data.data = tools.create.createPointData();
                }
                if (data.id === 2) {
                    data.data = tools.create.createLineData();
                }
                //
                this.exampleDatas.forEach(item => {
                    item.active = item.id === data.id
                });
                
                Action.home.emit('changeData', data);
            } else {
                //upload datas
                if (!this.uploadFile) {
                    this.$message.error('您还没有上传文件！');
                    return false;
                }
                for (const i in this.sConfig) {
                    if (this.sConfig.hasOwnProperty(i) && i === 'count') {
                        // 权重非必选项
                        break;
                    } else if (this.sConfig.hasOwnProperty(i) && !this.sConfig[i].value) {
                        this.$message.error(`${this.sConfig[i].title} 是必选项！`);
                        return false;
                    }
                }
                let options = {
                    layerInfo: this.layerInfo,
                    file: this.uploadFile,
                    dataType: this.dataType,
                    positionType: this.positionType,
                    selectConfig: this.sConfig
                };
                Action.home.emit('getUploads', options);
            }
            this.clearData();
            this.showDialog = false;
        }
    },
    mounted: function() {
        this.positionType = Object.keys(this.rConfig)[0];
        this.sConfig = this.rConfig[this.positionType] && this.rConfig[this.positionType].children;

        Store.on("home.addNewLayer", storeData => {
            this.layerInfo = storeData.data;
            this.showDialog = true;
        });

        Store.on("home.importNewLayer", storeData => {
            this.layerInfo = storeData.data;
        });

        Store.on("home.receiveSelects", storeData => {
            this.selectOptions = storeData.data;
        });

        Store.on("home.receiveUploads", storeData => {
            const uploadData = storeData.data;
            Action.home.emit('changeData', uploadData);
        });

        Store.on('home.receiveDatas', StoreData => {
            StoreData.data.forEach(item => {
                this.$set(item, 'active', false)
            })
            this.exampleDatas = StoreData.data;
            this.exampleData = StoreData.data[0];
            console.log('guagua',this.exampleDatas)
        });
        Action.home.emit('getDatas');
    }
}
</script>

<style lang="scss">
.md-dialog-title {
    padding: 16px 24px 10px;
    border-bottom: 1px solid #ccc;
    .small {
        margin-left: 12px;
        color: #999;
        font-size: 12px;
    }
}
.dialog-body {
    padding: 0 20px;
    height: 400px;
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
    .download-data {
        float: right;
        .el-icon-download {
            font-size: 16px;
            vertical-align: middle;
        }
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
            .el-icon-success {
                color: #f5533d;
                opacity: 0.8;
            }
            .el-upload__text em {
                color: #f5533d;
            }
            &:hover {
                border-color: #f5533d;
            }
        }
    }
    .el-upload__tip em {
        color: #f5533d;
        font-style: normal;
    }
}
.el-tooltip__popper {
    .tip-content {
        width: 300px;
        p {
            margin: 0;
        }
    }
}
.data-input,
.data-select {
    .input-required {
        display: inline-block;
        color: #f5533d;
        font-weight: bold;
        width: 10px;
    }
    .input-required.hidden {
        visibility: hidden;
    }
    .input-title {
        display: inline-block;
        font-size: 14px;
    }
    .pos-input {
        width: 180px;
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
        margin-top: 15px;
    }
}
.el-radio-button__inner:hover {
    color: #f5533d;
}
.el-radio-button__orig-radio:checked+.el-radio-button__inner {
    background-color: #f5533d;
    border-color: #f5533d;
    -webkit-box-shadow: -1px 0 0 0 #f5533d;
    box-shadow: -1px 0 0 0 #f5533d;
}
.el-radio__inner:hover {
    border-color: #f5533d;
}
.el-radio__input.is-checked .el-radio__inner {
    border-color: #f5533d;
    background: #f5533d;
}
.el-radio__input.is-checked+.el-radio__label {
    color: #f5533d;
}
</style>
