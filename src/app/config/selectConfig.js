export default {
    typeMap: {

    },
    selectMap: {
        Point: {
            lnglat: {
                name: '经纬度',
                children: {
                    longitude: {
                        title: '经度',
                        placeholder: '经度lng',
                        value: ''
                    },
                    latitude: {
                        title: '纬度',
                        placeholder: '纬度lat',
                        value: ''
                    },
                    count: {
                        title: '权重',
                        placeholder: '权重count',
                        value: ''
                    }
                }
            },
            address: {
                name: '位置',
                children: {
                    address: {
                        title: '位置',
                        placeholder: '位置address',
                        value: ''
                    },
                    count: {
                        title: '权重',
                        placeholder: '权重count',
                        value: ''
                    }
                }
            },
        },
        LineString: {
            lnglat: {
                name: '经纬度',
                children: {
                    longitudeStart: {
                        title: '起点经度',
                        placeholder: '起点经度lngS',
                        value: ''
                    },
                    latitudeStart: {
                        title: '起点纬度',
                        placeholder: '起点纬度latS',
                        value: ''
                    },
                    longitudeEnd: {
                        title: '终点经度',
                        placeholder: '终点经度lngE',
                        value: ''
                    },
                    latitudeEnd: {
                        title: '终点纬度',
                        placeholder: '终点纬度latE',
                        value: ''
                    },
                    count: {
                        title: '权重',
                        placeholder: '权重count',
                        value: ''
                    }
                }
            },
            position: {
                name: '坐标串',
                children: {
                    position: {
                        title: '坐标字符串',
                        placeholder: '起点lng,起点lat,终点lng,终点lat',
                        value: ''
                    },
                    count: {
                        title: '权重',
                        placeholder: '权重count',
                        value: ''
                    }
                }
            },
            address: {
                name: '位置',
                children: {
                    addressStart: {
                        title: '起点位置',
                        placeholder: '位置addressS',
                        value: ''
                    },
                    addressStart: {
                        title: '终点位置',
                        placeholder: '位置addressE',
                        value: ''
                    },
                    count: {
                        title: '权重',
                        placeholder: '权重count',
                        value: ''
                    }
                }
            },
        },
        Polygon: {
            position: {
                name: '坐标串',
                children: {
                    position: {
                        title: '坐标串',
                        placeholder: 'lng1,lat1,lng2,lat2,...',
                        value: ''
                    },
                    count: {
                        title: '权重',
                        placeholder: '权重count',
                        value: ''
                    }
                }
            },
            area: {
                name: '位置区域',
                children: {
                    area: {
                        title: '位置区域',
                        placeholder: '位置区域area',
                        value: ''
                    },
                    count: {
                        title: '权重',
                        placeholder: '权重count',
                        value: ''
                    }
                }
            },
        }
    }
};
