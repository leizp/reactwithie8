
import axios from 'axios';
import { ajaxbaseurl } from './config';
import { getToken, isIE89 } from './util';


const _axios = axios.create({ baseURL: ajaxbaseurl })


export default {
    get(url) {
        let config = {
            headers: {
                timestamp: Date.now(),
                token: getToken(),
            }
        }
        if (isIE89) {
            return new Promise((resolve, reject) => {


                url = `${url}${~url.indexOf('?') ? '&' : '?'}timestamp=${config.headers.timestamp}&token=${config.headers.token}`
                $.ajax({
                    type: 'GET',
                    url: ajaxbaseurl + url,
                    // headers: config.headers,
                    success(resp) {
                        resolve(resp)
                    },
                    error(e) {
                        if (e.statusText) {
                            let err = new Error(e.statusText);
                            err.code = e.status
                            reject(err)
                        } else {
                            reject(e)
                        }

                    }
                })
            })
        } else {

            return _axios.get(url, config).then(response => {
                if (response.status === 200) {
                    return response.data
                } else {
                    throw new Error(response.message)
                }
            })
        }
    },
    post(url, data) {
        let config = {
            headers: {
                timestamp: Date.now(),
                token: getToken(),
            }
        }
        if (isIE89) {
            return new Promise((resolve, reject) => {
                url = `${url}${~url.indexOf('?') ? '&' : '?'}timestamp=${config.headers.timestamp}&token=${config.headers.token}`
                // jQuery.support.cors = true;
                $.ajax({
                    type: 'POST',
                    url: ajaxbaseurl + url,
                    contentType: 'text/plain',
                    // contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify(data),
                    success(resp) {
                        resolve(resp)
                    },
                    error(e) {
                        if (e.statusText) {
                            let err = new Error(e.statusText);
                            err.code = e.status
                            reject(err)
                        } else {
                            reject(e)
                        }
                    }
                })
            })
        } else {

            return _axios.post(url, data, config).then(response => {
                if (response.status === 200) {
                    return response.data
                } else {
                    throw new Error(response.message)
                }
            })
        }
    }
}