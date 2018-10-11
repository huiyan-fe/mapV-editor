import fetchJsonp from 'fetch-jsonp';

function Status() {
    var count = 0;
    var lastDate = null;
    Object.defineProperty(this, 'count', {
        set: (value) => {
            count = value;
            if (count % 100 == 0) {
                if (!lastDate) {
                    lastDate = geoCodingStart;
                }
                let d = new Date();
                console.log(`${count},time:$${d-lastDate}`);
                lastDate = new Date();
            }
        },
        get: () => {
            // console.log(`${count}|`);
            return count;
        }
    });
}

function getPoint(name, callback) {
    let ak = "49tGfOjwBKkG9zG76wgcpIbce4VZdbv6";
    let address = name || "故宫";
    // 不支持跨域，需要使用JSONP
    let geoCodingUrl = `//api.map.baidu.com/geocoder/v2/?address=${address}&output=json&ak=${ak}`;
    fetchJsonp(geoCodingUrl, {
            // mode: "cors",
            credentials: "include",
            // jsonpCallback: null,
            // jsonCallbackFunction: null,
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('response not ok');
            }
        })
        .then(res => {
            if (res && res.status == 0 && res.result) {
                let ret = res.result;
                ret['name'] = name;
                callback && callback(ret);
            }
            return res;
        })
        .catch(error => {
            callback && callback(null);
            console.log("request failed", error);
        });
}

function batchGeoCoding(nameList, callback) {
    let resStatus = new Status();
    let geoCodingStart = new Date();
    let poiList = [];
    let cnts = 0;
    let cnte = 0;
    nameList.map(name => {
        cnts++;
        getPoint(name, function (poiInfo) {
            cnte++;
            resStatus.count = resStatus.count + 1;
            if (poiInfo) {
                poiList.push(poiInfo);
            }
            if (resStatus.count >= nameList.length) {
                let d = new Date();
                console.log('requests,spend:', d - geoCodingStart, poiList);
                callback && callback(poiList);
            }
        });
    });
}
// onmessage = function (e) {
//     let m = e.data;
//     console.log('worker receive:', e, m);
//     if (m && m.type && m.type == 'geocoding') {
//         let list = [
//             "曲阜路",
//             "包河区金寨路1号（金寨路与望江西路交叉口）",
//             "庐阳区凤台路209号（凤台路与蒙城北路交叉口）",
//             "蜀山区金寨路217号",
//             "蜀山区梅山路10号(近安徽饭店) ",
//             "铜锣湾广场312室",
//             "合肥市寿春路93号钱柜星乐町KTV",
//             "庐阳区长江中路177号",
//             "新站区胜利路89"
//         ];
//         batchGeoCoding(list, (pois) => {
//             postMessage(pois, e.origin);
//         });
//     }
// };
export default batchGeoCoding;