import { geoCoordMap } from './geoCoordMap'
//传入{name: '上海', value: 62239}  ,对照 经纬度表格,查找出经纬度   拼接成 [x,y,展示数据] =>  {name: '上海', value: [121.480237, 31.236305, 62239]}
export const convertData = function (data: any) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = geoCoordMap[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }

  return res
}
