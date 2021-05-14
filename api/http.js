function request(url, method, data) {
  const promise = new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res) {
        if (res.statusCode == 200) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      },
      fail(err) {
        reject(err);
      }
    })
  })
  return promise;
}

// 更新用户信息
export function updateUserInfo(form) {
  const url = 'http://1.117.110.210:80/student/information/'
  return request(url, 'post', form);
}

// 获取测试题
export function getQuestion(form) {
  const url = 'http://1.117.110.210:80/student/question/'
  return request(url, 'get', form);
}

// 提交测试题
export function submitQuestion(form) {
  const url = 'http://1.117.110.210:80/psy_testing/'
  return request(url, 'post', form);
}

// 获取测试题记录
export function getQuestionRecord(form) {
  const url = 'http://1.117.110.210:80/psy_testing/'
  return request(url, 'get', form);
}

// 获取留言记录
export function getMessageRecord(form) {
  const url = 'http://1.117.110.210:80/student/message/'
  return request(url, 'get', form);
}

// 获取预约的老师列表
export function getTeacherRecord(form) {
  const url = 'http://1.117.110.210:80/student/reserve/'
  return request(url, 'get', form);
}

// 获取老师列表
export function getTeacherList(form) {
  const url = 'http://1.117.110.210:80/student/teachers/'
  return request(url, 'get', form);
}

// 预约老师
export function reserveTeacher(form) {
  const url = 'http://1.117.110.210:80/student/reserve/'
  return request(url, 'post', form);
}

// 留言给老师
export function sendMessage(form) {
  const url = 'http://1.117.110.210:80/student/message/'
  return request(url, 'post', form);
}