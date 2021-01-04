import request from '@/utils/request'

export function searchList(data) {
    return request({
        url: 'Search/List',
        method: 'post',
        data
    })
}
