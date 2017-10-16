export default {
    styleMap: {
        Point: {
            simple: {
                name: '默认',
                config: {
                    fillStyle: '#ff3232' || 'rgba(255, 50, 50, 0.6)',
                    shadowColor: '#ff3232' || 'rgba(255, 50, 50, 1)',
                    shadowBlur: 30,
                    globalCompositeOperation: 'lighter',
                    size: 5,
                    draw: 'simple'
                }
            },
            bubble: {
                name: '气泡',
                config: {
                    fillStyle: '#ff3232' || 'rgba(255, 50, 50, 0.6)',
                    shadowColor: '#ff3232' || 'rgba(255, 50, 50, 1)',
                    shadowBlur: 30,
                    globalCompositeOperation: 'lighter',
                    maxSize: 40,
                    minSize: 0,
                    max: 100
                }
            },
            intensity: {
                name: '密度',
                config: {
                    shadowColor: '#ff3232' || 'rgba(255, 50, 50, 1)',
                    shadowBlur: 30,
                    globalCompositeOperation: 'lighter',
                    max: 100,
                    min: 0
                }
            },
            grid: {
                name: '网格',
                config: {
                    shadowColor: '#ff3232' || 'rgba(255, 50, 50, 1)',
                    shadowBlur: 30,
                    globalCompositeOperation: 'lighter',
                    size: 50,
                    max: 100,
                    min: 0,
                    label: true
                }
            },
            heatmap: {
                name: '热力',
                config: {
                    maxOpacity: 0.8,
                    max: 100,
                    size: 15
                }
            },
            honeycomb: {
                name: '蜂窝',
                config: {
                    shadowColor: '#ff3232' || 'rgba(255, 50, 50, 1)',
                    shadowBlur: 30,
                    globalCompositeOperation: 'lighter',
                    size: 50,
                    max: 100,
                    min: 0,
                    label: true
                }
            }
        },
        Line: {
            simple: {
                name: '默认',
                config: {
                    strokeStyle: 'rgba(255, 250, 50, 0.3)',
                    shadowColor: 'rgba(255, 250, 50, 1)',
                    shadowBlur: 20,
                    lineWidth: 0.7,
                    draw: 'simple'
                }
            },
            heatmap: {
                name: '热力',
                config: {
                    max: 50,
                }
            },
            intensity: {
                name: '密度',
                config: {
                    lineWidth: 0.5,
                    max: 30
                }
            }
        }
    },
    configLabelMap: {
        lineWidth: {
            name: '线宽',
            type: 'range',
            step: 0.1
        },
        label: {
            name: '标签',
            type: 'checkbox'
        },
        maxOpacity: {
            name: '透明度',
            type: 'range',
            max: 1,
            min: 0,
            step: 0.01
        },
        min: {
            name: '最小权重',
            type: 'range'
        },
        max: {
            name: '最大权重',
            type: 'range'
        },
        maxSize: {
            name: '最大值',
            type: 'range'
        },
        minSize: {
            name: '最小值',
            type: 'range'
        },
        fillStyle: {
            name: '填充颜色',
            type: 'color'
        },
        shadowColor: {
            name: '投影颜色',
            type: 'color',
        },
        strokeStyle: {
            name: '描边颜色',
            type: 'color',
        },
        shadowBlur: {
            name: '投影半径',
            type: 'range',
        },
        size: {
            name: '半径大小',
            type: 'range',
        },
        globalCompositeOperation: {
            name: '渲染方式',
            type: 'select',
            value: 'lighter',
            values: [{
                name: 'lighter',
                id: 'lighter'
            }, {
                name: 'xor',
                id: 'xor'
            }, {
                name: 'source-over',
                id: 'source-over'
            }, {
                name: 'source-in',
                id: 'source-in'
            }, {
                name: 'source-out',
                id: 'source-out'
            }, {
                name: 'source-atop',
                id: 'source-atop'
            }, {
                name: 'destination-over',
                id: 'destination-over'
            }, {
                name: 'destination-in',
                id: 'destination-in'
            }, {
                name: 'destination-out',
                id: 'destination-out'
            }, {
                name: 'destination-atop',
                id: 'destination-atop'
            }, {
                name: 'copy',
                id: 'cpoy'
            }]
        }
    }
};