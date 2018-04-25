import { request, config } from 'utils'

const { api } = config
const { vTimeUrl } = api

export async function query (params) {
  return request(vTimeUrl, {
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request(vTimeUrl, {
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request(vTimeUrl, {
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request(vTimeUrl, {
    method: 'put',
    data: params,
  })
}
