import types from './types.js';
//  demoDataSources: [], // only demoDates
// 	dataSources: [], // record all the datas you uploaded
// 	layers: [], // record the layer configs and dataSource pointer
// 	mapStyle: null,
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
		state.activeLayer = layer;
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
			target.data = newData;
			state.activeLayer = target;
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