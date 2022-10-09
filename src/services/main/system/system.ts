import XRequest from '@/services/index'
import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return XRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return XRequest.delete<IDataType>({
    url
  })
}

export function createPageData(url: string, newData: any) {
  console.log(newData)
  return XRequest.post<IDataType>({
    url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return XRequest.patch<IDataType>({
    url,
    data: editData
  })
}
