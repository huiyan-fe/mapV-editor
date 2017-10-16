<template lang="pug">

</template>

<script>
import { Action, Store } from 'marine';

console.log('init datas');

export default {
    data: function() {
        return {
            datas: []
        }
    },
    computed: {
    },
    methods: {
        changeNav: function(data) {
            this.nav = data;
            Action.home.emit('changeNav', data);
        }
    },
    mounted: function() {
        Store.on('home.getDatas', () => {
            Action.home.emit('receiveDatas', this.datas);
        });

        // demo datas
        let randomCount = 300;
        let data = [];
        const citys = ["北京", "天津", "上海", "重庆", "石家庄", "太原", "呼和浩特", "哈尔滨", "长春", "沈阳", "济南", "南京", "合肥", "杭州", "南昌", "福州", "郑州", "武汉", "长沙", "广州", "南宁", "西安", "银川", "兰州", "西宁", "乌鲁木齐", "成都", "贵阳", "昆明", "拉萨", "海口"];
        while (randomCount--) {
            const cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
            // if (cityCenter) {
            data.push({
                geometry: {
                    type: 'Point',
                    coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
                },
                count: 30 * Math.random()
            });
            // }
        }

        this.datas.push({
            id: 1,
            name: '示例点数据',
            data
        });

        // line data
        // randomCount = 1000;
        randomCount = 300;
        data = [];
        while (randomCount--) {
            var cityCenter1 = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
            var cityCenter2 = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
            data.push({
                geometry: {
                    type: 'LineString',
                    coordinates: [[cityCenter1.lng - 1 + Math.random() * 1, cityCenter1.lat - 1 + Math.random() * 1], [cityCenter2.lng - 1 + Math.random() * 1, cityCenter2.lat - 1 + Math.random() * 1]]
                },
                count: 30 * Math.random()
            });
        }
        this.datas.push({
            id: 2,
            name: '示例线数据',
            data
        });

    }
}
</script>

<style lang="scss">

</style>
