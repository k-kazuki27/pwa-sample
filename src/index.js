import './sw-update'
import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.locale(ja)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

const splited = () => import('./splited')

export const sendMsg = (action, msg) => {
  navigator.serviceWorker.controller.postMessage({ action, msg })
}

splited().then((module) => module.show())

setTimeout(() => {
  sendMsg('action', 'msg')
})

console.log('version', process.env.VERSION)
const element = document.getElementById('version')
element.innerText = 'version：' + dayjs(new Date(process.env.VERSION)).tz().format('YYYY/MM/DD mm:ss.SSS')
