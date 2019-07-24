import { getCityCurrent, setCityCurrent } from './index'
import axios from 'axios'

const curCity = getCityCurrent()
const myCitys = new window.BMap.LocalCity()
export const getBDapi = () => {
  if (!curCity) {
    return new Promise(resolve => {
      myCitys.get(async result => {
        var cityName = result.name
        const res = await axios.get('http://localhost:8080/area/info', {
          params: {
            name: cityName
          }
        })
        console.log(cityName)
        const { label, value } = res.data.body

        resolve({ label, value })
        setCityCurrent({ label, value })
      })
    })
  } else {
    return Promise.resolve(curCity)
  }
}
