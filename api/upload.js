import request from '@/utils/request'
export default {
    upload(formdata) {
        return request({
            headers: { 'Content-Type': 'multipart/form-data' },
            url: '/upload',
            method: 'post',
            data: formdata
        })
    }
}

