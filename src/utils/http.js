import Vue from 'vue'
import axios from 'axios'
// import QS from 'qs'
// Vue.prototype.qs = QS;
import weui from 'weui.js'
import address from './address.js'
var addressMapping = address.mapping;

function errorMsg(error) {
    loadingArr[loadingArr.length - 1].hide();
    weui.alert(error, {
        title: '请求异常'
    });
}

var http = axios.create({
    // baseURL: address.basic,
    timeout: 1000,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'  //转换为key=value的格式必须增加content-type
    },
    transformRequest: [function (data) {
        return data;
    }]
});

var loadingArr = [];
http.interceptors.request.use(function (config) {
    config.url = addressMapping[config.url] ? address.basic + addressMapping[config.url] : address.basic + config.url;

    console.info(config.url)
    var loading = weui.loading('loading', {
        className: 'custom-classname'
    });
    loadingArr.push(loading);
    let userId = sessionStorage.getItem('userId');
    if (config.method === 'post') {
        config.data = config.data.data;
        config.data.openid = 1234;
        config.data.userId = userId;
        config.data = JSON.stringify(config.data);
    } else {
        if (!config.params) {
            config.params = {};
        }
        config.params.openid = 1234;  //发送之前增加的属性
        config.params.userId = userId;
    }

    return config;
}, function (error) {
    errorMsg(error);
    return Promise.reject(error);
});

http.interceptors.response.use(function (res) {
    loadingArr[loadingArr.length - 1].hide();
    if (res.data.code !== 0) {
        errorMsg(res.data.msg)
        return Promise.reject(res.data);
    } else {
        return res.data.result;
    }
}, function (error) {
    errorMsg(error);
    return Promise.reject(error);
});

export default http;