import { request, config } from 'utils'

const { api } = config
const { applicationUrl, applicationApplyUrl } = api

export async function query (params) {
  return request(applicationUrl, {
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request(applicationApplyUrl, {
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request(applicationUrl, {
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request(applicationUrl, {
    method: 'put',
    data: params,
  })
}
