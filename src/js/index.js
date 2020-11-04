import '../pages/index.css';
import Api from './modules/Api';
import FormValidator from './components/FormValidator.js';
import NewsCards from "./components/NewsCards";
import Card from "./components/Card";
import monthChanger from "./constants/monthChanger";

const notFound = document.querySelector('.not-found');
const preloader = document.querySelector('.preloader');
const spanError = document.querySelector('.header__error')
const searchButton = document.querySelector('.header__search-button');
const newsForm = document.querySelector('.header__search');
const newsInput = document.querySelector('.header__search-text');
const validator = new FormValidator(newsForm, spanError);
const newsContainer = document.querySelector('.search-result__cards');
const searchIsHidden = document.querySelector('.search-result');
const showMoreNews = document.querySelector('.search-result__extend-button');
const MONTHSCHANGER = {
    '01': "января",
    '02': "февраля",
    '03': "марта",
    '04': "апреля",
    '05': "мая",
    '06': "июня",
    '07': "июля",
    '08': "августа",
    '09': "сентября",
    '10': "октября",
    '11': "ноября",
    '12': "декабря"
}

const url = 'https://nomoreparties.co/news/v2/everything' +
    'q=${newsInput.value}&' +
    'from=2020-09-16&' +
    'sortBy=popularity&' +
    'pageSize=100' +
    'apiKey=e532ea55bc1a4c099c61138e50d15465';
const api = new Api(url);

validator.setEventListeners();

document.getElementById("inputStorage").value = localStorage.getItem('inputStorage');
function handleInput() {
    localStorage.setItem('inputStorage', document.getElementById('inputStorage').value);
    console.log(document.getElementById('inputStorage').value)
}

function checkInput() {
    return  validator.setButtonStatus(validator.checkInputValidity(newsInput,spanError))
}
const date = new Date();
const sevenDaysAgo = date.getDate() -7;
const today = date.getDate();
function myDate(day){
    let dd = day;
    let mm = date.getMonth()+1;
    const yyyy = date.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    const newDate = yyyy+'-'+mm+'-'+dd;

    return newDate;
}
function timeChanger(date) {
    const normalDate = date.substr(0,10)
    const yearNumber = normalDate.substr(0,4)
    const monthNumber = normalDate.substr(5,2)
    const dayNumber = normalDate.substr(8,2)
    const changedDate = dayNumber + " " + MONTHSCHANGER[monthNumber]+ ", " + yearNumber;
    return changedDate
}

function createNews(object) {
    return new Card(object,newsContainer, timeChanger).create(object);
}

const newsCards = new NewsCards(newsContainer,createNews)

function sliceArray(array) {
    const slicedArray = array.slice(0,2);
    return slicedArray
}

function fetchInput() {
    preloader.classList.remove('is-hidden');
    notFound.classList.add('is-hidden');
    const apiKey = 'e532ea55bc1a4c099c61138e50d15465'
    const topic = newsInput.value;
    const url = `https://newsapi.org/v2/everything?q=${topic}&from=${myDate(sevenDaysAgo)}&to=${myDate(today)}&sortBy=popularity&pageSize=100&apiKey=${apiKey}`
    fetch(url).then((res) => {
        if (res.ok) {
            preloader.classList.add('is-hidden');
            localStorage.clear()
            handleInput()
            newsContainer.innerHTML = " ";
            return res.json();
        }
    }).then((data) => {
        console.log(data)
        console.log(data.totalResults)
        if (data.totalResults === 0) {
            searchIsHidden.classList.add('is-hidden');
            notFound.classList.remove('is-hidden');
        }
        else {
            console.log(data)
            localStorage.setItem('totalResults', data.articles.length);
            localStorage.setItem('totalCalls', data.totalResults);
            notFound.classList.add('is-hidden');
            const newsStorage = localStorage.setItem('news', JSON.stringify(data.articles))
            const getStorage = localStorage.getItem('news');
            newsCards.sliceArray(JSON.parse(getStorage));
            searchIsHidden.classList.remove('is-hidden');
            showMoreNews.classList.remove('is-hidden');
        }
    })
        .catch((err) => {
            console.log(err);
            preloader.classList.add('is-hidden');
            notFound.classList.remove('is-hidden');
        })
}
searchButton.addEventListener('click', function(event) {
    event.preventDefault()
    if (checkInput()) {
        fetchInput()
    }
    else {
        return false
    }
})

function documentReady() {
    if (localStorage.getItem('news') !== '[]' && localStorage.getItem('news') !== null) {
        searchIsHidden.classList.remove('is-hidden');
        const getStorage = localStorage.getItem('news');
        newsCards.sliceArray(JSON.parse(getStorage));
    }
    else {
        searchIsHidden.classList.add('is-hidden');
        return false
    }
}
documentReady()

function hide() {
    preloader.classList.add('.is-hidden');
}

function dataChanger() {
    const normalDate = date.substr(0,10)
    const yearNumber = normalDate.substr(0,4)
    const monthNumber = normalDate.substr(4,7)
    const dayNumber = normalDate.substr(7,10)
    const changedDate = dayNumber + monthChanger[monthNumber] + yearNumber;
    return changedDate
}

showMoreNews.addEventListener('click', function () {
    const getStorage = localStorage.getItem('news');
    if (getStorage === '[]') {
        showMoreNews.classList.add('is-hidden');
    }
    else {
        newsCards.sliceArray(JSON.parse(getStorage));
    }
});

