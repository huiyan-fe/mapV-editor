<template lang="pug">
.export(@click="exportImg" title="下载图层")
    svg(viewBox="0 0 1024 1024")
        path(d="M902.478 743.355L751.571 593.256c-6.097-6.062-18.124-11.024-26.725-11.024H641.55c-8.599 0-15.638 7.031-15.638 15.635v9.776h59.823c8.604 0 17.123 0.459 18.937 1.022l0.668 1.677 0.663 1.675c-0.943 1.661-6.843 7.844-13.102 13.738l-14.319 13.475h46.265c8.603 0 20.633 4.957 26.741 11.015l95.483 94.731c6.106 6.057 4.062 11.018-4.537 11.018h-200.42c-8.598 0-15.635 7.038-15.635 15.635v80.893c0 8.598-7.035 15.638-15.638 15.638H411.339c-8.598 0-15.643-7.037-15.643-15.638v-80.893c0-8.597-7.031-15.635-15.636-15.635H182.397c-8.598 0-10.676-4.996-4.624-11.103l93.823-94.557c6.054-6.105 18.047-11.101 26.651-11.101h47.163l-14.317-13.475c-6.263-5.895-12.158-12.081-13.103-13.743l0.658-1.677 0.673-1.671c1.817-0.563 10.341-1.022 18.938-1.022h57.349v-9.776c0-8.599-7.037-15.635-15.635-15.635h-82.646c-8.598 0-20.627 4.96-26.723 11.024L119.928 743.13c-6.097 6.063-11.081 18.061-11.067 26.665l0.189 142.721c0.007 8.599 7.058 15.634 15.657 15.634h773.221c8.599 0 15.636-7.035 15.636-15.634V770.024c-0.001-8.601-4.988-20.597-11.086-26.665z")
        path(d="M244.22 339.61l-0.935 2.323-0.912 2.333c1.313 2.311 9.506 10.907 18.21 19.102l223.379 210.235c8.704 8.193 19.185 17.069 23.297 19.728h9.473c4.107-2.659 14.587-11.537 23.295-19.728L763.43 363.368c8.7-8.194 16.899-16.784 18.209-19.094l-0.924-2.327-0.932-2.329c-2.521-0.782-14.357-1.421-26.318-1.421H631.924c-11.954 0-21.735-9.78-21.735-21.728V115.958c0-11.95-0.785-25.833-1.751-30.849l-3.467-3.437-3.494-3.502c-5.011-0.958-18.894-1.745-30.85-1.745H453.392c-11.954 0-25.837 0.785-30.85 1.745l-3.493 3.502-3.463 3.437c-0.965 5.017-1.759 18.896-1.759 30.849v200.506c0 11.949-9.782 21.728-21.726 21.728H270.55c-11.948 0-23.795 0.639-26.32 1.421z")
//- .export-btn(@click="exportImg") 下载
</template>


<script>
import { Action, Store } from "marine";
export default {
    components: {},
    mounted: function () {
        Store.on('home.receiveLayers', (storeData) => {
            this.mapvLayers = storeData.data;
        });
        Action.home.emit('getLayers');

    },
    methods: {
        exportImg: function () {
            const centers = [];
            const preWidth = 1000;

            const zoom = map.getZoom();

            let currentWidth = 0;
            let currentHeight = 0
            while (currentWidth < map.width) {
                currentWidth += preWidth;
                const useWidth = currentWidth > map.width ? preWidth - currentWidth + map.width : preWidth;
                const useX = currentWidth > map.width ?
                    (preWidth - currentWidth + map.width) / 2 + (currentWidth - preWidth) :
                    (currentWidth - preWidth / 2);
                // height
                currentHeight = 0;
                while (currentHeight < map.height) {
                    currentHeight += preWidth;
                    const useHeight = currentHeight > map.height ?
                        preWidth - currentHeight + map.height :
                        preWidth;
                    const useY = currentHeight > map.height ?
                        (preWidth - currentHeight + map.height) / 2 + (currentHeight - preWidth) :
                        currentHeight - preWidth / 2;
                    // if (currentHeight > map.height) {
                    // console.log(useX, useY)
                    centers.push({
                        x: useX,
                        y: useY,
                        left: currentWidth - preWidth,
                        top: currentHeight - preWidth,
                        point: map.pixelToPoint({
                            x: useX,
                            y: useY
                        }),
                        width: useWidth,
                        height: useHeight,
                        zoom
                    });
                    // }
                }
            }

            const promises = [];
            let mapstyle = localStorage.getItem('v-mapstyle');
            if (mapstyle === 'normal' || mapstyle === '6639f6523d2848ac4296ca004fd7f72a' || mapstyle === 'e028eb1c1d7436ab9f088b3eb51788ed') {
                mapstyle = 'normal';
            } else {
                mapstyle = 'visualization';
            }
            centers.forEach(item => {
                let url = `//api.map.baidu.com/customimage/staticmap?`;
                // url += `styles=${localStorage.getItem('e-mapstyle') || 'visualization'}&`;
                url += `center=${item.point.lng},${item.point.lat}&`;
                url += `zoom=${item.zoom}&`;
                url += `width=${item.width}&`;
                url += `height=${item.height}&`;
                url += `customid=${mapstyle}&scaler=2`;

                const imgFetch = fetch(url)
                    .then(res => res.blob())
                    .then(res => {
                        return new Promise((resolve, rej) => {
                            const img = new Image();
                            img.src = URL.createObjectURL(res);
                            img.onload = () => {
                                item.image = img;
                                resolve(item);
                            }
                        });
                    });
                promises.push(imgFetch);
            });

            // add water mask
            const maskFetch = fetch('//huiyan.baidu.com/cms/mapV-editor/newlogo_baidumap.png')
                .then(res => res.blob())
                .then(res => {
                    return new Promise((resolve, rej) => {
                        const waterMask = new Image();
                        waterMask.src = URL.createObjectURL(res);
                        waterMask.onload = () => {
                            resolve(waterMask);
                        }
                    });
                });
            promises.push(maskFetch);

            Promise.all(promises).then(res => {
                const canvas = document.createElement('canvas');
                canvas.height = map.height;
                canvas.width = map.width;
                canvas.style.height = canvas.height + 'px';
                canvas.style.width = canvas.width + 'px';
                const ctx = canvas.getContext('2d');
                res.forEach(item => {
                    if (item.image) {
                        ctx.drawImage(
                            item.image,
                            0, 0, item.width * 2, item.height * 2,
                            item.left, item.top, item.width, item.height
                        );
                    } else {
                        // add water mask
                        ctx.drawImage(item, 0, 0, 174, 56, 20, canvas.height - 50, 87, 28);
                    }
                });
                this.mapvLayers.sort((a, b) => {
                    return b.zIndex - a.zIndex;
                });

                this.mapvLayers.forEach(item => {
                    if (item.mapv && item.visible) {
                        const mapvCanvas = item.mapv.getContext().canvas;
                        ctx.drawImage(
                            mapvCanvas,
                            0, 0, mapvCanvas.width, mapvCanvas.height,
                            0, 0, map.width, map.height
                        );
                    }
                });

                const a = document.createElement('a');
                a.href = canvas.toDataURL().replace("image/png", "image/octet-stream");
                a.download = "MapvOutput.png";
                a.click();
            })
            // 
        }
    }
}
</script>

<style lang="scss">
.export {
  cursor: pointer;
  position: absolute;
  bottom: 104px;
  right: 10px;
  z-index: 4000;
  width: 26px;
  height: 26px;
  fill: #999;
  background: #fff;
  padding: 4px;
  box-shadow: 1px 2px 1px rgba(0,0,0,.15);
  border-radius: 2px;
  &:hover {
    fill: #4682ff;
  }
}
.export-btn {
    position:absolute;
    top: 600px;
    cursor: pointer;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 100px;
    background-color: transparent;
    border:1px solid #eee;
    color: #fff;
    width: 180px;
    height: 30px;
    margin: 15px 20px;
    &:hover {
      background-color: rgba(245,83,61,0.7);
      border-color: rgba(245,83,61,0.7);
    }
    &:active {
      background-color: #f5533d;
      border-color: #f5533d;
    }
}
</style>


