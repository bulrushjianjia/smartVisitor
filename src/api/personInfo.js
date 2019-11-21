import http from '../utils/http.js'

export default {
    query() {
        return http.get('/getPersonInfo')
    },
    edit(data) {
        return http.post('/updatePersonInfo', { data })
    }
} 