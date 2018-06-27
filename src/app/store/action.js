import types from './types.js';

export default {
	changeLayerProperty({
		commit,
		dispatch,
		state
	}, property, {
		id,
		v
	}) {
		switch (property) {
			case 'visibility':
				{
					commit(types.CHANGE_LAYER_VISIBLE, {
						id,
						v
					});
					break;
				}
			case 'style':
				{
					commit(types.CHANGE_LAYER_STYLE, {
						id,
						v
					});
					break;
				}
			default:
				{
					console.warn('layer have no such property:' + property);
					break;
				}
		}
	},
	addData({
		commit,
		dispatch,
		state
	}, {
		data,
		name
	}) {
		commit(types.ADD_DATASOURCE, {
			data,
			name
		});
		// dispatch(types.CHANGE_ACTIVE_TAB, 'layer');
	},
	changeNavTab({
		commit
	}, newTab) {
		commit(types.CHANGE_ACTIVE_TAB, {
			newTab,
		});
	},
	changeLayerData({
		commit,
		dispatch,
		state
	}, {layerid,newData}) {
		let target = null;
		for (let i in state.layers) {
			if (state.layers[i].id === layerid) {
				target = state.layers[i];
				break;
			}
		}
		if (target) {
			target.data = StoreData.data;
			if (target.mapv) {
				target.mapv.dataSet.set(StoreData.data.data);
			} else {
				const dataSet = new mapv.DataSet(StoreData.data.data);
				target.mapv = new mapv.baiduMapLayer(map, dataSet, {
					zIndex: target.zIndex
				});
				// console.log(target.mapv)
				if (target.layerHide) {
					target.mapv.hide();
				}
			}
			// set defalut options
			const defalutDrawType = StoreData.data.data[0].geometry.type;
			if (styleConfig.styleMap[defalutDrawType]) {
				const defalutConfig = JSON.parse(
					JSON.stringify(
						styleConfig.styleMap[defalutDrawType].simple.config
					)
				);
				console.warn(defalutConfig);
				if (StoreData.data.data.length > 100 && defalutConfig.useShadow) {
					defalutConfig.useShadow = false;
					defalutConfig.shadowBlur = 0;
				}
				defalutConfig.dataType = defalutDrawType;
				target.config = defalutConfig;
			}
			Action.home.emit("initConfig", target.config);
		}
		commit(types.CHANGE_ACTIVE_TAB, {
			newTab,
		});
	},
};