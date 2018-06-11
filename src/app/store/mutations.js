import types from './types.js';
//  demoDataSources: [], // only demoDates
// 	dataSources: [], // record all the datas you uploaded
// 	layers: [], // record the layer configs and dataSource pointer
// 	mapStyle: null,
export default {
	[types.ADD_DATASOURCE](state, {data, name = '未命名'}) {
		state.dataSources.push({
			id: Math.random() + state.dataSources.length,
			name: name,
			data: data,
			visible: true,
		});
	},
	[types.DELETE_DATASOURCE](state, {id}) {
		state.dataSources = state.dataSources.filter(s => {
			return s.id != id;
		});
	},
	[types.ADD_LAYER](state, {dataId, style, name = '未命名'}) {
		state.layers.push({
			id: Math.random() + state.layers.length,
			dataId: dataId,
			nmae: name,
			visible: true,
			style: style,
		});
	},
	[types.DELETE_LAYER](state, {id}) {
		state.layers = state.layers.filter(s => {
			return s.id != id;
		});
	},
	[types.CHANEGE_LAYER_VISIBLE](state,{ id, v}) {
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
	[types.CHANEGE_LAYER_STYLE](state, {id, newStyle}) {
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
	[types.CHANGE_MAP_STYLE](state, {newStyle}) {
		state['mapStyle'] = newStyle;
	},
	[types.CHANGE_ACTIVE_TAB](state, {newTab}) {
		state['activeNavTab'] = newTab;
	},
};