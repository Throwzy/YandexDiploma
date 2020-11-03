export default class Api {
    constructor(config) {
    this.config = config;
    }
    getSomeNews(url) {
        fetch(url).then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`)
            }
            return res.json()
        })
    }
}