// 随机颜色
// 1. 16进制 #000000 - #ffffff
function randomHexColor() {
    let hex = Math.floor(Math.random() * 16777216).toString(16);
    while(hex.length < 6) {
        hex += '0'
    }
    return `#${hex}`;
}
// 2. rgb格式
function randomRgbColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const a = Math.random();
    return `rgb${r}${g}${b}, ${a}`;
}


const map = {};
function cacheRequest(url, successCb, failCb) {
    if (map[url] && map[url].data) {
        return successCb(map[url].data)
    }
    if (map[url] && map[url].err) {
        return failCb(map[url].err)
    }
    const resolve = (data) => {
        map[url].data = data;
        while (map[url]['resolve']) {
            const cb = map[url]['resolve'].pop()(data);
            cb(data);
        }
    }
    const reject = (err) => {
        map[url].err = err;
        while (map[url]['reject']) {
            const cb = map[url]['reject'].pop()(err);
            cb(err);
        }
    }

    if (map[url]) {
        map[url]['resolve'].push(successCb);
        map[url]['reject'].push(failCb);
    } else {
        map[url] = {
            resolve: [successCb],
            reject: [failCb],
        }
        request(url, resolve, reject)
    }
}

function parseParam(url) {
    let paramsArray = url.slice(url.indexOf('?') + 1).split('&');
    let paramsObj = {};
    paramsArray.forEach((item) => {
        if (~item.indexOf('=')) {
            let [key, value] = item.split('=');
            value = decodeURIComponent(value);
            if 
        }
    })
}
