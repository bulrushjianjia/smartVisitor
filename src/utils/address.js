export default {
    basic: 'http://192.168.210.186:8080/cgi',
    mapping: {
        // 获取个人信息
        '/getPersonInfo': "/visitor/info.api",
        //获取部门列表
        '/getDepartmentList': "/visitor/department.api",
        //更新个人信息
        '/updatePersonInfo': "/visitor/save.api",
        //获取企业列表
        '/getEnterpriseList': "/visitor/enterprise.api",
        //获取来访预约与邀请来访列表（可根据id查询单条访问记录）
        '/getVisitList': "/visitor/record.api",
        //校验受访者信息
        '/checkInterviewer': '/visitor/checkInterInfo.api',
        //提交来访预约与邀请访问表单
        '/submitVisit': "/visitor/submit.api",
        //获取来访邀请二维码
        '/getQRcode': "/visitor/qrcode.api",
        //来访预约审核
        '/examineVisit': "/visitor/review.api",
        // //获取来访预约地址list
        '/getAddressList': "/company/list.api",
    }
}

