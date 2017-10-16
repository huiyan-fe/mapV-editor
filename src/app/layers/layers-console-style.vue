<template lang="pug">
    .layers-console-body-block
        md-button-toggle(md-single)
            md-button(v-for="(value,key) in styleMap" :key='key' :class="key===config.draw?'md-toggle':''" @click='changeDrawType(key)') {{value.name}}
        .btns-block(v-for="(value,key) in config")
            label(v-if="configMap[key]") {{configMap[key]&&configMap[key].name}} 
            input(v-if="configMap[key]&&configMap[key].type!=='select'" 
                :type='configMap[key]&&configMap[key].type' 
                :name="key" 
                :value="value"
                :max="configMap[key]&&configMap[key].max"
                :min="configMap[key]&&configMap[key].min"
                :step="configMap[key]&&configMap[key].step"
                @change="changeconfig($event,key)"
            )
            select(v-if="configMap[key]&&configMap[key].type==='select'" @change="changeconfig($event,key)" :value="value")
                option(v-for="value in configMap[key].values" :value="value.id") {{value.name}}
            span(v-if="configMap[key]" class="layers-console-value") {{value}}
</template>

<script>
import { Action, Store } from 'marine';
import tools from '../tools/tools';
import styleConfig from '../config/styleConfig.js';
export default {
    data: function() {
        return {
            styleMap: styleConfig.styleMap,
            configMap: styleConfig.configLabelMap,
            config: {}
        }
    },
    methods: {
        changeconfig: function(e, key) {
            this.config[key] = e.target.value;
            Action.home.emit('changeConfig', this.config);
        },
        changeDrawType: function(key) {
            if (this.styleMap[key].config) {
                const newConfig = JSON.parse(JSON.stringify(this.styleMap[key].config));
                newConfig.dataType = this.config.dataType;
                
                this.config = newConfig;
            }
            this.config.draw = key;
            this.styleMap = styleConfig.styleMap[this.config.dataType];
            Action.home.emit('changeConfig', this.config);
        }
    },
    mounted: function() {
        Store.on('home.initConfig', StoreData => {
            this.config = StoreData.data;
            // console.log(this.config.dataType);
            this.styleMap = styleConfig.styleMap[this.config.dataType];
        });

        Store.on('home.changeActiveLayer', StoreData => {
            this.config = StoreData.data.config || {};
            this.styleMap = styleConfig.styleMap[this.config.dataType];
            // console.log(this.config.dataType);
        });
    }
}
</script>

<style lang="scss">
.layers-console-body-block {
    .md-button-toggle {
        padding: 0 10px;
        display: block;
    }
    .md-theme-default.md-button-toggle {
        button {
            color: #999;
            min-height: initial;
            min-width: initial;
            line-height: 1.6em;
            padding: 5px 12px;
            margin: 5px 5px 5px 0;
        }
        .md-toggle {
            color: white;
            background: #505050;
        }
    }
    .btns-block {
        padding: 5px 10px;
        label {
            margin-right: 10px;
        }
    }
    .layers-console-value {
        float: right;
        color: #666;
    }
}
</style>
