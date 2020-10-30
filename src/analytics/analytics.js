import '../pages/index.css';
import Statistics from "../js/components/Statistics";
import {month} from '../js/constants/constants';

const askedTitle = document.querySelector('.asked__title');
const inputValue = localStorage.getItem('inputStorage');
const weeklyNewsParagraph = document.querySelector('.asked__weekly-posts-counter');
const getTotalResults = localStorage.getItem('totalResults');
const getTotalCalls = localStorage.getItem('totalCalls');
const callsCell = document.querySelector('.asked__weekly-names-counter');
const storageData = 'news';
const daysDateCell = document.querySelector('.information__days');
const infoPercentage = document.querySelector('.information__percentage');
const statistics = new Statistics(storageData,month,daysDateCell,infoPercentage);

function youAsked() {
    askedTitle.textContent = `Вы спросили: «${inputValue}»`;
}

function weeklyNewsCounter() {
    weeklyNewsParagraph.textContent = getTotalCalls;
}

function weeklyCalls() {
    callsCell.textContent = statistics.mentionCounter();
}
youAsked()
weeklyNewsCounter()
weeklyCalls()
statistics.startAll()
