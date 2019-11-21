import Mock from 'mockjs'
const Random = Mock.Random;

Mock.setup({
    timeout: '200-600'
})
let successRes = {
    code: 0,
    result: {
        guid: '@id'
    }
};

let personInfo = {
    userId: "000000001",
    userName: "孙思邈",
    enterpriseId: 101,
    enterpriseName: "青岛航天信息",
    departmentName: "yanfa",
    departmentId: 109,
    phoneNumber: "17686867878",
    IDCard: "371082199809072456",
    photo: "static/img/personal-photo.png"
}

Mock.mock(/\/getPersonInfo/, {
    code: 0,
    msg: "",
    result: personInfo
});

// Mock.mock(/\/getDepartmentList/, {
//     code: 0,
//     msg: '',
//     result: [{
//         "departmentId": "00001",
//         "departmentName": "研发部门"
//     },
//     {
//         "departmentId": "00002",
//         "departmentName": "客服部门"
//     },
//     {
//         "departmentId": "00003",
//         "departmentName": "行政部门"
//     }]
// });

Mock.mock(/\/getDepartmentList/, {
    code: 0,
    msg: '',
    result: [{
        "departmentId": 102, "departmentName": "总1 ", "parentId": 101
    }, {
        "departmentId": 103, "departmentName": "研发部门", "parentId": 101
    }, {
        "departmentId": 104, "departmentName": "市场部门", "parentId": 103
    }, {
        "departmentId": 105, "departmentName": "测试部门", "parentId": 103
    }, {
        "departmentId": 106, "departmentName": "财务部门", "parentId": 104
    }, {
        "departmentId": 107, "departmentName": "运维部门", "parentId": 104
    }, {
        "departmentId": 108, "departmentName": "zong1", "parentId": 102
    }, {
        "departmentId": 109, "departmentName": "zong12", "parentId": 108
    }]
});
Mock.mock(/\/getEnterpriseList/, {
    code: 0,
    msg: '',
    result: [{
        "enterpriseId": 101,
        "enterpriseName": "青岛航天信息"
    },
    {
        "enterpriseId": 102,
        "enterpriseName": "阿里巴巴"
    },
    {
        "enterpriseId": 103,
        "enterpriseName": "腾讯"
    }]
});

Mock.mock(/\/updatePersonInfo/, successRes);

Mock.mock(/\/getVisitList/, {
    "code": 0,
    "msg": "",
    "result|5-10": [{
        "visitId": "@id",
        "visitor": {
            "personName": "@cname",
            "sex": 0,
            "phoneNumber": /^1[385][1-9]\d{8}/,
            "IDCard": "@id",
            "enterpriseName": Random.pick(["阿里巴巴", "腾讯", "科大讯飞", "高校信息", "方欣科技", "莉莉丝游戏公司", "青岛海尔", "青岛海信", "网易"]),
            "purpose": "@csentence",
            "hasPhoto": '1',
            "photo": "/static/img/personal-photo.png",
            // "visitTimeStart": "@datetime('yyyy-MM-dd HH:mm')",
            // "visitTimeEnd": "@datetime('yyyy-MM-dd HH:mm')"
            "visitTimeStart": "2020-12-01 11:00",
            "visitTimeEnd": "2020-12-12 12:00"
        },
        "visitStatus": 2,
        "respondent": personInfo,
        "examineReport": "@csentence",
        "qrcodeImg": "static/img/QRcode.png"
    }]
});

Mock.mock(/\/submitVisit/, successRes);
Mock.mock(/\/examineVisit/, successRes);

Mock.mock(/\/getAddressList/, {
    "code": 0,
    "msg": "",
    "result|5-10": [{
        "positionName": '@csentence',
        "positionUrl": 'http://192.168.200.174:8099/#/VisitForm/request',
        "positionGuid": "@id"
    }]
});

Mock.mock(/\/getQRcode/, {
    "code": 0,
    "msg": "",
    "result": {
        "qrcodeImg": "static/img/QRcode.png"
    }
})

Mock.mock(/\/checkUbterviewer/, {
    "code": 1,
    "msg": "未找到该员工", 
    "result": "11111"
})



console.info(Mock)

export default Mock;

