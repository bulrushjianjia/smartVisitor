import http from '../utils/http.js'

export default {
    query() {
        return http.get('/getAddressList')
    },
}