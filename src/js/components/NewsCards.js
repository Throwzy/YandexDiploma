export default class NewsCards {
    constructor(container, createNews,) {
        this.container = container;
        this.createNews = createNews;
    }

    addCard(object) {
        const card = this.createNews(object);
        this.container.appendChild(card);
    }

    render(sliced) {
        this.sliced = sliced.forEach((card)=> {
            this.addCard(card);
        })

    }
    sliceArray(data) {
            let removed = data.splice(0,3);
            this.render(removed);
            localStorage.setItem('news', JSON.stringify(data));
            return data
    }
}