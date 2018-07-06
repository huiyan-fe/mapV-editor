import types from './types.js';
import styleConfig from "../config/styleConfig.js";

export default {
	[types.ADD_DATASOURCE](state, {
		data,
		name = '未命名'
	}) {
		let ts = JSON.parse(JSON.stringify(state.dataSources));
		ts.push({
			id: Math.random() + ts.length,
			name: name,
			data: data,
			visible: true,
		});
		state.dataSources = ts
	},
	[types.DELETE_DATASOURCE](state, {
		id
	}) {
		state.dataSources = state.dataSources.filter(s => {
			return s.id != id;
		});
	},
	[types.ADD_LAYER](state, {
		layer
	}) {
		state.layers.map(l => {
			l.active = false;
		})
		layer.active = true;
		state.layers.unshift(layer);
		state.edittingLayer = layer;
	},
	[types.CHANGE_LAYER_DATA](state, {
		layerid,
		newData
	}) {
		let target = null;
		for (let i in state.layers) {
			if (state.layers[i].id === layerid) {
				target = state.layers[i];
				break;
			}
		}
		if (target) {
			// set defalut options
			const defalutDrawType = newData.data[0].geometry.type;
			if (styleConfig.styleMap[defalutDrawType]) {
			  const defalutConfig = JSON.parse(
				JSON.stringify(
				  styleConfig.styleMap[defalutDrawType].simple.config
				)
			  );
			  console.warn(defalutConfig);
			  if (newData.data.length > 100 && defalutConfig.useShadow) {
				defalutConfig.useShadow = false;
				defalutConfig.shadowBlur = 0;
			  }
			  defalutConfig.dataType = defalutDrawType;
			  target.config = defalutConfig;
			}
			target.data = newData;
			state.edittingLayer = target;
			console.log('change layer data', layerid, newData.id)
		}
	},
	[types.DELETE_LAYER](state, {
		id
	}) {
		state.layers = state.layers.filter(s => {
			return s.id != id;
		});
	},
	[types.CHANEGE_LAYER_VISIBLE](state, {
		id,
		v
	}) {
		let pos = null;
		state.layers.map((s, i) => {
			if (s.id == id) {
				pos = i;
			}
		});
		if (pos !== null) {
			state.layers[pos]['visible'] = v;
		}
	},
	[types.CHANEGE_LAYER_STYLE](state, {
		id,
		newStyle
	}) {
		let pos = null;
		state.layers.map((s, i) => {
			if (s.id == id) {
				pos = i;
			}
		});
		if (pos !== null) {
			state.layers[pos]['style'] = newStyle;
		}
	},
	[types.CHANGE_MAP_STYLE](state, {
		newStyle
	}) {
		state['mapStyle'] = newStyle;
	},
	[types.CHANGE_ACTIVE_TAB](state, {
		newTab
	}) {
		state['activeNavTab'] = newTab;
	},
};