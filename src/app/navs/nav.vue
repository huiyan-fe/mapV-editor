<template lang="pug">
.app-nav
    .app-nav-block(@click="changeNav('layer')" :class="nav==='layer'?'active':''") 图层
        .svg
            svg
                path(d="M21 17.016v-14.016h-14.016v14.016h14.016zM21 0.984c1.078 0 2.016 0.938 2.016 2.016v14.016c0 1.078-0.938 1.969-2.016 1.969h-14.016c-1.078 0-1.969-0.891-1.969-1.969v-14.016c0-1.078 0.891-2.016 1.969-2.016h14.016zM3 5.016v15.984h15.984v2.016h-15.984c-1.078 0-2.016-0.938-2.016-2.016v-15.984h2.016zM15.938 10.313l3.563 4.688h-11.016l2.766-3.516 1.969 2.344z")
    .app-nav-block(@click="changeNav('data')" :class="nav==='data'?'active':''") 数据
        .svg
            svg
                path(d="M6.984 12v2.016h-1.969v-2.016h1.969zM6.984 8.016v1.969h-1.969v-1.969h1.969zM18.984 12v2.016h-10.969v-2.016h10.969zM18.984 8.016v1.969h-10.969v-1.969h10.969zM21 17.016v-12h-18v12h18zM21 3c1.078 0 2.016 0.938 2.016 2.016l-0.047 12c0 1.078-0.891 1.969-1.969 1.969h-5.016v2.016h-7.969v-2.016h-5.016c-1.078 0-2.016-0.891-2.016-1.969v-12c0-1.078 0.938-2.016 2.016-2.016h18z")
    .app-nav-block(@click="changeNav('map')" :class="nav==='map'?'active':''") 地图
        .svg
            svg
                path(d="M16.359 14.016h3.375c0.141-0.656 0.281-1.313 0.281-2.016s-0.141-1.359-0.281-2.016h-3.375c0.094 0.656 0.141 1.313 0.141 2.016s-0.047 1.359-0.141 2.016zM14.578 19.547c1.828-0.609 3.422-1.922 4.359-3.563h-2.953c-0.328 1.266-0.797 2.438-1.406 3.563zM14.344 14.016c0.094-0.656 0.141-1.313 0.141-2.016s-0.047-1.359-0.141-2.016h-4.688c-0.094 0.656-0.141 1.313-0.141 2.016s0.047 1.359 0.141 2.016h4.688zM12 19.969c0.844-1.219 1.5-2.531 1.922-3.984h-3.844c0.422 1.453 1.078 2.766 1.922 3.984zM8.016 8.016c0.328-1.266 0.797-2.438 1.406-3.563-1.828 0.609-3.422 1.922-4.359 3.563h2.953zM5.063 15.984c0.938 1.641 2.531 2.953 4.359 3.563-0.609-1.125-1.078-2.297-1.406-3.563h-2.953zM4.266 14.016h3.375c-0.094-0.656-0.141-1.313-0.141-2.016s0.047-1.359 0.141-2.016h-3.375c-0.141 0.656-0.281 1.313-0.281 2.016s0.141 1.359 0.281 2.016zM12 4.031c-0.844 1.219-1.5 2.531-1.922 3.984h3.844c-0.422-1.453-1.078-2.766-1.922-3.984zM18.938 8.016c-0.938-1.641-2.531-2.953-4.359-3.563 0.609 1.125 1.078 2.297 1.406 3.563h2.953zM12 2.016c5.531 0 9.984 4.453 9.984 9.984s-4.453 9.984-9.984 9.984-9.984-4.453-9.984-9.984 4.453-9.984 9.984-9.984z")
</template>

<script>
import { Action } from 'marine';

export default {
    data: function() {
        return {
            nav: null
        }
    },
    computed: {
    },
    methods: {
        changeNav: function(data) {
            this.nav = data;
            Action.home.emit('changeNav', data);
        }
    }
}
</script>

<style lang="scss">
.app-nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    bottom: 0;
    background: #222;
    color: #b9b9b9;
    .app-nav-block {
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 14px;
        border-bottom: 1px solid #424242;
        cursor: pointer;
        position: relative;
        &:hover {
            .svg {
                left: -100px;
            }
        }
        background: #323232;
        &.active .svg {
            background: #323232;
        }
        .svg {
            transition: all 0.3s ease;
            height: 59px;
            width: 60px;
            position: absolute;
            top: 0;
            left: 0;
            fill: #b9b9b9;
            background: #222;
            svg {
                width: 24px;
                height: 24px;
                position: absolute;
                top: 50%;
                left: 50%;
                margin: -14px;
            }
        }
    }
}
</style>
