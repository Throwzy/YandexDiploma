export default class CommitCard {
    constructor(commitObject,container, timeChanger) {
        this.container = container;
    this.commitObject = commitObject;
    this.name = commitObject.commit.author.name;
    this.email = commitObject.commit.committer.email;
    this.date = commitObject.commit.committer.date;
    this.message = commitObject.commit.message;
    this.avatar = commitObject.author.avatar_url;
    this.DataChanger = timeChanger;
    }

    setProperties(commitObject) {
    const markup = `<div class="commits__item">
                    <p class="commits__date">14 августа, 2019</p>
                    <div class="commits__profile-box">
                        <img class="commits__profile-picture" src="<%=require('./images/image-01.png').default%>" alt="Фото профиля">
                        <div class="commits__name-box">
                            <p class="commits__name">Антон Долинин</p>
                            <p class="commits__email">anton@yandex.ru</p>
                        </div>
                    </div>
                    <p class="commits__text">Emmet (formerly Zen Coding) is a web- developer’s toolkit that can greatly improve your HTML & CSS workflow.</p>
                </div>`
        const element = document.createElement('div')
        element.insertAdjacentHTML('afterbegin', markup);
        const newCommit = element.firstElementChild;
        newCommit.querySelector('.commits__date').textContent = this.DataChanger(this.date);
        newCommit.querySelector('.commits__profile-picture').src= this.avatar;
        newCommit.querySelector('.commits__name').textContent = this.name;
        newCommit.querySelector('.commits__email').textContent = this.email;
        newCommit.querySelector('.commits__text').textContent = this.message;
        this.newCommit = newCommit;
        return newCommit
    }
}