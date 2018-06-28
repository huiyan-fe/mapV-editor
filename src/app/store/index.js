import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';

Vue.use(Vuex);
const state = {
	demoDataSources: [], // only demoDates
	dataSources: [], // record all the datas you uploaded
	layers: [], // record the layer configs and dataSource pointer
	mapStyle: null,
	activeNavTab: '', //data,layer,map
	test:1,
	activeLayer:null,
};

export default new Vuex.Store({
	state,
	actions,
	mutations
});