// import DataChanger from "../components/DataChanger";
// console.log(DataChanger)
export default class Card {
    constructor(object,newsContainer , timeChanger) {
        this.object = object;
        this.newsContainer = newsContainer;
        this.author = object.author;
        this.content = object.content;
        this.description = object.description;
        this.publishedAt = object.publishedAt;
        this.url = object.url;
        this.source = object.name;
        this.title = object.title;
        this.urlToImage = object.urlToImage;
        this.source = object.source.name;
        this.DataChanger = timeChanger;
    }
    create(object) {
        const markup = `<li class="search-result__card"><a href="#" class="search-result__cards-link"><img alt="Фото новости" class="search-result__image" src="<%=require('./images/image_08.png').default%>">
                <p class="search-result__date">2 августа, 2019</p>
                <h3 class="search-result__card-title">Национальное достояние – парки</h3>
                <p class="search-result__card-paragraph">В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий,
                    где и сегодня каждый может приобщиться к природе.</p>
                <p class="search-result__media-sponsor">Лента.ру</p></a></li>`
        const element = document.createElement('div')
        element.insertAdjacentHTML('afterbegin', markup);
        const newPost = element.firstElementChild;
        let link = newPost.querySelector('.search-result__cards-link');
        newPost.querySelector('.search-result__image').src = this.urlToImage;
        newPost.querySelector('.search-result__date').textContent = this.DataChanger(this.publishedAt);
        newPost.querySelector('.search-result__card-title').textContent = this.title;
        newPost.querySelector('.search-result__card-paragraph').textContent = this.description;
        newPost.querySelector('.search-result__media-sponsor').textContent = this.source;
        newPost.querySelector('.search-result__cards-link').href = this.url;
        this.newPost = newPost;
        return newPost;
    }
}