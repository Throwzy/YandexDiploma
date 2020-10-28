import '../pages/index.css';
import Swiper, { Navigation, Pagination } from 'swiper';
import CommitCard from "../js/components/CommitCard";
import CommitCardList from "../js/components/CommitCardList";
import Flickity from 'flickity';
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
const slider = document.querySelector('.swiper-wrapper');
const commitContainer = document.querySelector('.swiper-wrapper');
const commitList = new CommitCardList(makeCommits,commitContainer);

function myDate(day){
    let dd = day;
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    let newDate = yyyy+'-'+mm+'-'+dd;

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

function makeCommits(commitObject) {
    return new CommitCard(commitObject,commitContainer, timeChanger).setProperties(commitObject);
}

function getCommits() {
    const url = 'https://api.github.com/repos/Throwzy/YandexDiploma/commits';
    fetch(url).then((res) => {
        if (res.ok) {
            return res.json()
        }
    }).then((data) => {
        commitList.render(data)
        let swiper = new Flickity( slider, {
            // options
            cellAlign: 'center',
            contain: true
        })
    })
}
getCommits()