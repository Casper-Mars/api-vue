import axios from 'axios'
import config from '../../vue.config'


function apiCall(url, method, headers, params, success, failure) {
    url = config.publicPath + url;
    url = formatUrl(url);
    axios({
        url: url,
        method: method,
        data: method === 'post' || method === 'put' ? params : null,
        params: method === 'get' || method === 'delete' ? params : null,
    }).then((data) => {
        if (data.status === 200) {
            success(data.data);
        } else {
            failure(data)
        }
    }).catch(function (err) {
        let res = err.response
        if (err) {
            window.alert('api error, HTTP CODE: ' + res.status)
        }
    })
}

/*除去url中出现的“//”，转为“/”*/
function formatUrl(url) {
    return url.replace("//", "/");
}


export default {
    get: function (url, params, success, failure) {
        return apiCall(url, "get", null, params, success, failure);
    },
    post: function (url, params, success, failure) {
        return apiCall(url, "post", null, params, success, failure);
    },
    put: function (url, params, success, failure) {
        return apiCall(url, "put", null, params, success, failure);
    },
    delete: function (url, params, success, failure) {
        return apiCall(url, "delete", null, params, success, failure);
    },
}
