export default {
    styleMap: {
        Polygon: {
            simple: {
                name: '默认',
                config: {
                    fillStyle: '#ff5035',
                    strokeStyle: '#faff35',
                    lineWidth: 1,
                    draw: 'simple',
                    globalAlpha: 0.8,
                }
            },
            intensity: {
                name: '密度',
                config: {
                    gradient: {
                        0: 'yellow',
                        1: 'red'
                    },
                    globalAlpha: 0.8,
                    draw: 'intensity'
                }
            }
        },
        Point: {
            simple: {
                name: '默认',
                config: {
                    fillStyle: 'rgba(255, 50, 50, 0.6)',
                    globalCompositeOperation: 'lighter',
                    size: 5,
                    useShadow: true,
                    shadowColor: 'rgba(255, 50, 50, 1)',
                    shadowBlur: 30,
                    draw: 'simple'
                }
            },
            bubble: {
                name: '气泡',
                config: {
                    fillStyle: 'rgba(255, 50, 50, 0.6)',
                    useShadow: true,
                    shadowColor: 'rgba(255, 50, 50, 1)',
                    shadowBlur: 30,
                    globalCompositeOperation: 'lighter',
                    maxSize: 40,
                    minSize: 2,
                    max: 100,
                    draw: 'bubble'
                }
            },
            intensity: {
                name: '密度',
                config: {
                    useShadow: true,
                    shadowColor: 'rgba(255, 50, 50, 1)',
                    shadowBlur: 30,
                    globalCompositeOperation: 'lighter',
                    min: 2,
                    max: 100,
                    draw: 'intensity'
                }
            },
            grid: {
                name: '网格',
                config: {
                    useShadow: true,
                    shadowColor: 'rgba(255, 50, 50, 1)',
                    shadowBlur: 0,
                    globalCompositeOperation: 'lighter',
                    globalAlpha: 1.0,
                    enableCluster: true,
                    unit: 'px',
                    size: 50,
                    min: 2,
                    max: 100,
                    label: true,
                    draw: 'grid'
                }
            },
            heatmap: {
                name: '热力',
                config: {
                    maxOpacity: 0.8,
                    max: 100,
                    unit: 'px',
                    size: 15,
                    draw: 'heatmap'
                }
            },
            honeycomb: {
                name: '蜂窝',
                config: {
                    useShadow: true,
                    shadowColor: 'rgba(255, 50, 50, 1)',
                    shadowBlur: 30,
                    globalCompositeOperation: 'lighter',
                    size: 50,
                    min: 2,
                    max: 100,
                    label: true,
                    draw: 'honeycomb'
                }
            },
            text: {
                name: '文字',
                config: {
                    textCol: '',
                    fillStyle: 'rgba(255, 250, 250, 1)',
                    useShadow: true,
                    shadowColor: 'rgba(255, 250, 250, 1)',
                    shadowBlur: 10,
                    size: 12,
                    textAlign: 'center',
                    textBaseline: 'middle',
                    globalCompositeOperation: 'source-over',
                    offset: {
                        x: 0,
                        y: 0
                    },
                    avoid: true,
                    draw: 'text'
                }
            }
        },
        LineString: {
            simple: {
                name: '默认',
                config: {
                    strokeStyle: 'rgba(255, 250, 50, 0.3)',
                    lineWidth: 2,
                    useShadow: true,
                    shadowColor: 'rgba(255, 250, 50, 1)',
                    shadowBlur: 20,
                    draw: 'simple'
                }
            },
            heatmap: {
                name: '热力',
                config: {
                    max: 50,
                    draw: 'heatmap'
                }
            },
            intensity: {
                name: '密度',
                config: {
                    lineWidth: 0.5,
                    max: 30,
                    useShadow: true,
                    shadowColor: 'rgba(255, 250, 50, 1)',
                    shadowBlur: 20,
                    draw: 'intensity'
                }
            }
        },
        MultiLineString: {
            simple: {
                name: '默认',
                config: {
                    strokeStyle: 'rgba(255, 250, 50, 0.3)',
                    lineWidth: 2,
                    useShadow: true,
                    shadowColor: 'rgba(255, 250, 50, 1)',
                    shadowBlur: 20,
                    draw: 'simple'
                }
            },
            heatmap: {
                name: '热力',
                config: {
                    max: 50,
                    draw: 'heatmap'
                }
            },
            intensity: {
                name: '密度',
                config: {
                    lineWidth: 0.5,
                    max: 30,
                    useShadow: true,
                    shadowColor: 'rgba(255, 250, 50, 1)',
                    shadowBlur: 20,
                    draw: 'intensity'
                }
            }
        }
    },
    configLabelMap: {
        lineWidth: {
            name: '线宽',
            type: 'range',
            max: 10,
            min: 0.1,
            step: 0.1
        },
        label: {
            name: '标签',
            type: 'checkbox'
        },
        globalAlpha: {
            name: '透明度',
            type: 'range',
            max: 1,
            min: 0,
            step: 0.01
        },
        maxOpacity: {
            name: '透明度',
            type: 'range',
            max: 1,
            min: 0.01,
            step: 0.01
        },
        min: {
            name: '最小权重',
            type: 'range'
        },
        max: {
            name: '最大权重',
            type: 'range',
            max: 10000
        },
        maxSize: {
            name: '最大半径',
            type: 'range'
        },
        minSize: {
            name: '最小半径',
            type: 'range'
        },
        fillStyle: {
            name: '填充颜色',
            type: 'color'
        },
        useShadow: {
            name: '使用阴影',
            type: 'checkbox'
        },
        shadowColor: {
            name: '阴影颜色',
            type: 'color',
        },
        strokeStyle: {
            name: '描边颜色',
            type: 'color',
        },
        shadowBlur: {
            name: '阴影半径',
            type: 'range',
            min: 1,
            tooltip: '阴影半径越大，图形边缘越模糊'
        },
        size: {
            name: '半径大小',
            type: 'range',
            min: 1,
            max: 100,
            maxUnitM: 2000
        },
        offset: {
            name: '文本偏移',
            type: 'range',
            min: -50,
            max: 50
        },
        avoid: {
            name: '标注避让',
            type: 'checkbox'
        },
        textCol: {
            name: '文本表头',
            type: 'select',
            value: '',
            values: []
        },
        enableCluster: {
            name: '启用聚合',
            type: 'checkbox'
        },
        unit: {
            name: '绘制单位',
            type: 'select',
            value: 'px',
            values: [
                {
                    name: '像素',
                    id: 'px'
                }, {
                    name: '米',
                    id: 'm'
                }
            ]
        }
        // globalCompositeOperation: {
        //     name: '渲染方式',
        //     type: 'select',
        //     value: 'lighter',
        //     values: [{
        //         name: 'lighter',
        //         id: 'lighter'
        //     }, {
        //         name: 'xor',
        //         id: 'xor'
        //     }, {
        //         name: 'source-over',
        //         id: 'source-over'
        //     }, {
        //         name: 'source-in',
        //         id: 'source-in'
        //     }, {
        //         name: 'source-out',
        //         id: 'source-out'
        //     }, {
        //         name: 'source-atop',
        //         id: 'source-atop'
        //     }, {
        //         name: 'destination-over',
        //         id: 'destination-over'
        //     }, {
        //         name: 'destination-in',
        //         id: 'destination-in'
        //     }, {
        //         name: 'destination-out',
        //         id: 'destination-out'
        //     }, {
        //         name: 'destination-atop',
        //         id: 'destination-atop'
        //     }, {
        //         name: 'copy',
        //         id: 'cpoy'
        //     }]
        // }
    }
};