import http from '../utils/http.js'

export default {
    query(params) {
        return http.get('/getVisitList', { params })
    },
    examine(data) {
        return http.post('/examineVisit', { data });
    },
    submit(data) {
        return http.post('/submitVisit', { data })
    },
    getQRcode(params) {
        return http.get('/getQRcode', { params });
    },
    checkInterviewer(data) {
        return http.post('/checkInterviewer', { data });
    }
}