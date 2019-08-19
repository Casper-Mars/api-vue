import axios from 'axios'
import config from '../../vue.config'
import ElementUI from 'element-ui'
// axios.defaults.withCredentials = true

function apiCall(url, method, headers, params, success, failure) {
    url = config.publicPath + url;
    url = formatUrl(url);
    if (!headers) {
        headers = {}
    }
    headers["Content-Type"] = "application/json"
    axios({
        url: url,
        method: method,
        data: method === 'post' || method === 'put' ? params : null,
        params: method === 'get' || method === 'delete' ? params : null,
        // data: params,
        // params: params,
        headers: headers
    }).then((data) => {
        if (data.status === 200) {
            success(data.data);
        } else {
            failure(data)
        }
    }).catch(function (err) {
        let res = err.response
        if (err) {
            ElementUI.Message.warning('api error, HTTP CODE: ' + res.status)
        }
    })
}

/*除去url中出现的“//”，转为“/”*/
function formatUrl(url) {
    if (url.indexOf("http://") === 1) {
        return url.substring(1, url.length)
    }
    return url.replace("//", "/");
}


export default {
    get: function (url, params, headers = null, success, failure) {
        return apiCall(url, "get", headers, params, success, failure);
    },
    post: function (url, params, headers = null, success, failure) {
        return apiCall(url, "post", headers, params, success, failure);
    },
    put: function (url, params, headers = null, success, failure) {
        return apiCall(url, "put", headers, params, success, failure);
    },
    delete: function (url, params, headers = null, success, failure) {
        return apiCall(url, "delete", headers, params, success, failure);
    },
}
