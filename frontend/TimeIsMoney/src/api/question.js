import axios from 'axios'

/**
 * Get all the questionnaires and show on the index
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getQuesList () {
    // let response = await axios.get('/allques')
    // console.log('response:'+JSON.stringify(response.data))
    let data = {
        "success": true,
        "msg": "获取成功",
        "data": [
            {
                "task_id": 123,
                "title": "qwerwqrewqrwqr",
                "publisher": "rewqrwqrewqrewq",
                "detail": "ewqrewwqrewqrewq",
                "reward": 0,
                "attend": 10,
                "total": 100,
                "endtime": "2019-4-28",
                "status": "not done"
            },
            {
                "task_id": 10,
                "title": "qrewqrewqre",
                "publisher": "ewqrqwrewqr",
                "detail": "qrewqrewqr",
                "reward": 0,
                "attend": 10,
                "total": 100,
                "endtime": "2019-4-28",
                "status": "not done"
            },
        ]
    }
    return data
    // return response.data

}

/**
 * Get the detail of the questionnaire
 * @param {string}  id  id of questionnaire
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getDetail (id) {
    // let response = await axios.get('/allques')
    // console.log('response:'+JSON.stringify(response.data))
    let data = {
        quesid: 123,
        total: 90, 
        attend: 5, 
        startTime: '2019.5.3 18:00', 
        endTime: '2019.5.2.19:00',
        publisher:'suata', 
        head:'../../static/jump/social.png', 
        title:'没找到', 
        detail:'关于大学生心理健康的相关调查，目前比较需要男孩子哦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊', 
        command:'在校大学生', 
        reward: 10
    }
      // console.log(id)
    if(id === 123){
    // console.log(id)
    data.title = '大学生心理健康调查!!!'
    }
    return data
    // return response.data

}