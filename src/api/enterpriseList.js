import http from '../utils/http.js'

export default {
    query(params) {
        return http.get('/getEnterpriseList', {params});
    }
}