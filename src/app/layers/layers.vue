<template lang="pug">
    div
        .layers
            .layers-fn
                .layers-title 图层管理
                .layers-new 
                    md-button.md-raised.layers-new-btn(@click="addLayer") 新建图层
            .layers-tips(v-if="list.length<=0")
                .tips 还没有图层？
                .tips 请点击“新建图层”按钮以添加图层
                .tips
                .tips 什么是图层？
                .tips 图层是mapV编辑器的重要概念，它相当于一张透明的纸，对于每一个样的图层，你可以指定其绑定的数据以及绘制数据的样式，不同图层的叠加可以创造出各种神奇的效果。
                .tips 就像如果你在第一个图层上绘制陆地，第二个图层上绘制河流，第三个图层上绘制山脉，第四个图层上绘制城市...在你把所有的图层合并起来之后，你就会获得一个非常完美的地图。
            ul.layers-lists(v-if="list.length>0")
                li(draggable v-for="(item, index) in list" :class="item.active?'active':''" 
                    @click='changeActive(index)'
                    @dragstart='listitemDrag($event, index)' 
                    @dragend='listitemDragEnd($event)'
                    @dragover='listitemDragOver($event, index)' 
                    @dragleave='listitemDragLeave($event, index)'
                    @drop='listitemDrop($event, index)' )
                    svg(viewBox="0 0 24 24" v-if="!item.visiable" @click='showLayer(item)')
                        path(d="M10.137 5.213c0.569-0.138 1.2-0.213 1.844-0.213h0.025c2.6 0 5.075 1.225 7.356 3.644 1.25 1.325 2.1 2.675 2.494 3.35-0.537 0.931-1.131 1.781-1.8 2.575-0.356 0.419-0.306 1.050 0.119 1.406 0.188 0.156 0.419 0.237 0.644 0.237 0.281 0 0.569-0.119 0.762-0.356 0.875-1.038 1.625-2.144 2.3-3.387 0.156-0.288 0.162-0.631 0.012-0.925-0.044-0.087-1.087-2.156-3.038-4.238-2.65-2.813-5.712-4.306-8.856-4.306h-0.025c-0.794 0-1.594 0.094-2.319 0.269-0.537 0.131-0.863 0.675-0.731 1.206 0.138 0.537 0.675 0.869 1.212 0.738z")
                        path(d="M23.706 22.294l-5.050-5.050c-0.006-0.006-0.012-0.012-0.025-0.025l-16.925-16.925c-0.387-0.387-1.025-0.387-1.413 0s-0.387 1.025 0 1.413l4.275 4.275c-1.794 1.544-3.288 3.406-4.45 5.538-0.156 0.288-0.162 0.631-0.019 0.925 0.044 0.087 1.088 2.156 3.044 4.237 2.65 2.825 5.712 4.319 8.862 4.319 0.006 0 0.012 0 0.019 0 2.094-0.037 4.081-0.637 5.8-1.756l4.462 4.463c0.194 0.194 0.45 0.294 0.706 0.294s0.513-0.1 0.706-0.294c0.4-0.387 0.4-1.025 0.006-1.413zM10.025 11.444l2.531 2.531c-0.2 0.069-0.412 0.1-0.631 0.1-1.1 0-2-0.9-2-2 0-0.219 0.038-0.431 0.1-0.631zM12 19c-2.6 0-5.075-1.231-7.362-3.644-1.25-1.325-2.1-2.669-2.494-3.35 1.025-1.769 2.319-3.312 3.844-4.606l2.55 2.55c-0.394 0.631-0.612 1.369-0.612 2.125 0 2.206 1.794 4 4 4 0.756 0 1.494-0.219 2.125-0.612l2.325 2.325c-1.319 0.769-2.813 1.188-4.375 1.212z")
                    svg(viewBox="0 0 24 24" v-if="item.visiable" @click='hideLayer(item)')
                        path(d="M23.894 11.55c-0.044-0.087-1.087-2.156-3.038-4.238-2.65-2.819-5.712-4.313-8.856-4.313s-6.206 1.494-8.856 4.319c-1.95 2.081-2.994 4.15-3.037 4.238-0.144 0.281-0.144 0.612 0 0.894 0.044 0.087 1.087 2.156 3.037 4.237 2.65 2.819 5.712 4.313 8.856 4.313s6.206-1.494 8.856-4.319c1.95-2.081 2.994-4.15 3.038-4.237 0.144-0.275 0.144-0.612 0-0.894zM19.362 15.356c-2.288 2.419-4.763 3.644-7.362 3.644s-5.075-1.225-7.362-3.644c-1.25-1.325-2.106-2.675-2.5-3.356 0.394-0.675 1.244-2.025 2.5-3.356 2.287-2.419 4.762-3.644 7.362-3.644s5.075 1.225 7.362 3.644c1.25 1.331 2.106 2.675 2.5 3.356-0.4 0.675-1.25 2.025-2.5 3.356z")
                        path(d="M12 8c-2.206 0-4 1.794-4 4s1.794 4 4 4c2.206 0 4-1.794 4-4s-1.794-4-4-4zM12 14c-1.1 0-2-0.9-2-2s0.9-2 2-2c1.1 0 2 0.9 2 2s-0.9 2-2 2z")
                    input(v-model="item.name")
                    svg.tarsh(viewBox="0 0 24 24" @click='removeLayer(item)')
                        path(d="M21 5h-4v-1c0-1.656-1.344-3-3-3h-4c-1.656 0-3 1.344-3 3v1h-4c-0.55 0-1 0.45-1 1s0.45 1 1 1h1v13c0 1.656 1.344 3 3 3h10c1.656 0 3-1.344 3-3v-13h1c0.55 0 1-0.45 1-1s-0.45-1-1-1zM9 4c0-0.55 0.45-1 1-1h4c0.55 0 1 0.45 1 1v1h-6v-1zM18 20c0 0.55-0.45 1-1 1h-10c-0.55 0-1-0.45-1-1v-13h12v13z")
                        path(d="M10 10c-0.55 0-1 0.45-1 1v6c0 0.55 0.45 1 1 1s1-0.45 1-1v-6c0-0.55-0.45-1-1-1z")
                        path(d="M14 10c-0.55 0-1 0.45-1 1v6c0 0.55 0.45 1 1 1s1-0.45 1-1v-6c0-0.55-0.45-1-1-1z")
        Console
        DataModal
</template>

<script>
import Console from './layers-console.vue';
import DataModal from './layers-datamodal.vue';
import { Action, Store } from 'marine';
let index = 0;
export default {
    components: {
        Console,
        DataModal
    },
    data: function () {
        return {
            list: [],
        }
    },
    methods: {
        changeName: function (e, item) {
            item.name = e.target.innerText;
        },
        addLayer: function (layerInfo = {}) {
            let hasActive = this.list.forEach(item => item.active = false);
            const newLayer = {
                visiable: true,
                name: `${(layerInfo && layerInfo.name) ? layerInfo.name : '新建图层'}-${this.list.length + 1}`,
                active: true,
                id: `${+new Date()}_${index++}`,
                zIndex: index * 10
            }
            this.list.unshift(newLayer);
            Action.home.emit('addNewLayer', newLayer);
            Action.home.emit('changeActiveLayer', newLayer);
        },
        changeActive: function (index) {
            let hasActive = this.list.forEach((item, listIndex) => {
                const isActive = index === listIndex;
                item.active = isActive;
                if (isActive) {
                    Action.home.emit('changeActiveLayer', this.list[index]);
                }
            });

        },
        hideLayer: function (clickItem) {
            this.list.forEach(item => {
                if (clickItem === item) {
                    item.visiable = false;
                }
            });
            Action.home.emit('hideLayer', clickItem);
        },
        removeLayer: function (clickItem) {
            this.list.forEach((item, index) => {
                if (clickItem === item) {
                    const mapvtraget = this.list.splice(index, 1);
                    if (mapvtraget[0].mapv) {
                        mapvtraget[0].mapv.destroy();
                    }
                }
            });
            Action.home.emit('removeLayer', clickItem);
        },
        showLayer: function (clickItem) {
            this.list.forEach(item => {
                if (clickItem === item) {
                    item.visiable = true;
                }
            });
            Action.home.emit('showLayer', clickItem);
        },
        listitemDrag: function (e, index) {
            e.target.style.opacity = 0.9;
            this.hasDroped = false;
            this.dragIndex = index;
        },
        listitemDragEnd: function (e) {
            e.target.style.opacity = 1;
        },
        listitemDrop: function (e, index) {
            e.currentTarget.style.borderBottom = '2px solid #323232';
            this.hasDroped = true;
            // sort
            this.reRangeIndex(this.dragIndex, index);
            // console.log('drop')
        },
        listitemDragOver: function (e, index) {
            this.itemDragOverIndex = index;
            e.currentTarget.style.borderBottom = '2px solid #4a4a4a';
        },
        listitemDragLeave: function (e, index) {
            this.itemDragOverIndex = null;
            this.itemDragLeave = index;
            e.currentTarget.style.borderBottom = '2px solid #323232';
        },
        reRangeIndex: function (start, to) {
            const old = this.list.splice(start, 1);
            this.list.splice(to, 0, old[0]);

            this.list.forEach((list, index) => {
                list.zIndex = (this.list.length - index) * 10;
            });

            Action.home.emit('updateZIndex', [start, to])
        }
    },
    mounted: function () {
        // add a new leayer while import new data 
        Store.on('home.importData', StoreData => {
            this.addLayer({
                name: '导入数据'
            });
        });
        Store.on('home.receiveLayers', StoreData => {
            StoreData.data.forEach(item => {
                item.active = false;
                return item;
            });
            this.list = StoreData.data;
        });
        Action.home.emit('getLayers');
    }
}
</script>

<style lang="scss">

</style>
