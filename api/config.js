const systemInfo = wx.getSystemInfoSync()
const isTest = systemInfo.platform === 'devtools'

const test = {
  baseUrl: 'http://localhost:8000',
  isTest
}

const production = {
  baseUrl: 'http://localhost:8000',
  isTest
}

module.exports = isTest ? test : production