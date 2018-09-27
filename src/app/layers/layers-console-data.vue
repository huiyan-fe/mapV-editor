<template lang="pug">
    md-dialog.data-transform(
        :md-active.sync="showDialog"
        :md-click-outside-to-close="false"
    )
        md-dialog-title 新建图层
        div.dialog-body
            el-radio-group.radio-btn-gp(v-model="dataTab" @change="changeDataTab")
                el-radio-button(label=1) 上传数据
                el-radio-button(label=2) 查看示例数据
            div(v-if="dataTab == 1")
                el-row.data-type
                    el-col(:span="6") 
                        span.type-title 选择数据类型: 
                    el-col(:span="18") 
                        el-radio-group(v-model="dataType")
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
                        el-upload(drag multiple action="")
                            i.el-icon-upload
                            div.el-upload__text 将文件拖到此处，或
                                em 点击上传
                            div.el-upload__tip(slot="tip") 请上传 {{dataType}}数据 的文件
                el-row.data-input
                    el-col(:span="6") 
                        span.input-title 选择数据类型: 
                    el-col(:span="18")
                        el-radio-group(v-model="positionType")
                            el-radio(label="lnglat") 经纬度
                            el-radio(label="position") 位置
                        el-input.pos-input(v-if="positionType === 'lnglat'" placeholder="经度lng")
                        el-input.pos-input(v-if="positionType === 'lnglat'" placeholder="维度lat")
                        el-input.pos-input(v-if="positionType === 'position'" placeholder="位置location")
            div(v-if="dataTab == 2")
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
            dataTab: 1,
            dataType: 'point',
            positionType: 'lnglat',
            exampleType: 1,
            datas: [],
            ExampleData: null
        }
    },
    methods: {
        changeDataTab: function(tab) {
            console.log(tab)
        },
        changeExample: function(data) {
            this.ExampleData = data;
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
                
                Action.home.emit('submitImport', this.layerInfo);
                Action.home.emit('changeData', data);
            } else {
                
            }
            this.showDialog = false;
        }
    },
    mounted: function() {
        Store.on("home.addNewLayer", storeData => {
            this.layerInfo = storeData.data;
            this.showDialog = true;
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
.dialog-body {
    padding: 0 20px;
    min-height: 420px;
    min-width: 600px;
}

.radio-btn-gp {
    display: block;
    text-align: center;
    margin-bottom: 10px;
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

.data-input {
    .input-title {
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
</style>
