import axios from 'axios';

export const getDataAPI = params => new Promise((resolve, reject) => {
    axios({
        url: params.url,
        method: params.method,
        success: resolve(),
        error: reject(),
    })
})
